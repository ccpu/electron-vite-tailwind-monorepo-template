import { sourceInspectorPlugin } from '@pixpilot/vite-plugin-source-inspector';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import rendererConfig from 'electron-vite-toolkit/vite/renderer';

/**
 * @param {import('vite').UserConfig & { sourceInspector?: import('@pixpilot/vite-plugin-source-inspector').SourceInspectorOptions | false }} options - Additional Vite configuration options to merge. Pass `sourceInspector: false` to opt out of the source inspector.
 * @returns {import('vite').UserConfig} - The complete Vite configuration.
 */
function createRendererViteConfig(options = {}) {
  const { sourceInspector, ...viteOptions } = options;

  return rendererConfig({
    ...viteOptions,
    plugins: [
      react(),
      tailwindcss(),
      // Dev-only: adds source locations to JSX so elements can be opened in the editor.
      ...(sourceInspector === false ? [] : [sourceInspectorPlugin(sourceInspector)]),
      ...(viteOptions.plugins || []),
    ],
  });
}
export default createRendererViteConfig;
