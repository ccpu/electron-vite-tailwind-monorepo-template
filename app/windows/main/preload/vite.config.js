import { getChromeMajorVersion } from '@internal/electron-versions';
import { resolveModuleExportNames } from 'mlly';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default {
  build: {
    ssr: true,
    sourcemap: 'inline',
    outDir: 'dist',
    target: `chrome${getChromeMajorVersion()}`,
    assetsDir: '.',
    lib: {
      entry: ['src/exposed.ts', 'virtual:browser.js'],
    },
    rollupOptions: {
      output: [
        {
          // ESM preload scripts must have the .mjs extension
          // https://www.electronjs.org/docs/latest/tutorial/esm#esm-preload-scripts-must-have-the-mjs-extension
          entryFileNames: '[name].mjs',
        },
      ],
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  plugins: [mockExposed(), handleHotReload()],
};

/**
 * This plugin creates a browser (renderer) version of `preload` package.
 * Basically, it just read all nominals you exported from package and define it as globalThis properties
 * expecting that real values were exposed by `electron.contextBridge.exposeInMainWorld()`
 *
 * Example:
 * ```ts
 * // index.ts
 * export const someVar = 'my-value';
 * ```
 *
 * Output
 * ```js
 * // _virtual_browser.mjs
 * export const someVar = globalThis[<hash>] // 'my-value'
 * ```
 */
function mockExposed() {
  const virtualModuleId = 'virtual:browser.js';
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  return {
    name: 'electron-main-exposer',
    /**
     * @param {string} id
     */
    resolveId(id) {
      if (id.endsWith(virtualModuleId)) {
        return resolvedVirtualModuleId;
      }
      return null;
    },
    /**
     * @param {string} id
     */
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const exportedNames = await resolveModuleExportNames('./src/index.ts', {
          url: import.meta.url,
        });
        return exportedNames.reduce(
          (s, key) =>
            s +
            (key === 'default'
              ? `export default globalThis['${btoa(key)}'];\n`
              : `export const ${key} = globalThis['${btoa(key)}'];\n`),
          '',
        );
      }
      return null;
    },
  };
}

/**
 * Implement Electron webview reload when some file was changed
 * @return {import('vite').Plugin}
 */
function handleHotReload() {
  /** @type {import('vite').ViteDevServer|null} */
  let rendererWatchServer = null;

  return {
    name: '@app/preload-process-hot-reload',

    config(config, env) {
      if (env.mode !== 'development') {
        return;
      }

      if (!config.plugins) {
        throw new Error('No plugins found in config');
      }

      const rendererWatchServerProvider = config.plugins.find(
        (p) =>
          p &&
          typeof p === 'object' &&
          'name' in p &&
          p.name === '@app/renderer-watch-server-provider',
      );
      if (
        !rendererWatchServerProvider ||
        typeof rendererWatchServerProvider !== 'object' ||
        !('api' in rendererWatchServerProvider)
      ) {
        throw new Error('Renderer watch server provider not found or invalid');
      }

      rendererWatchServer = rendererWatchServerProvider.api.provideRendererWatchServer();
      // No return value per Vite plugin API
    },

    writeBundle() {
      if (!rendererWatchServer) {
        return;
      }

      rendererWatchServer.ws.send({
        type: 'full-reload',
      });
    },
  };
}
