import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// noinspection JSIgnoredPromiseFromCall
/**
 * We resolve '@app/renderer' and '@app/preload'
 * here and not in '@app/main'
 * to observe good practices of modular design.
 * This allows fewer dependencies and better separation of concerns in '@app/main'.
 * Thus,
 * the main module remains simplistic and efficient
 * as it receives initialization instructions rather than direct module imports.
 */

(async () => {
  const mainDist = await import('../app/main/dist/index.js');
  const { initApp } = mainDist;

  // Function to get the correct settings HTML path for dev vs production
  function getSettingsHtmlPath() {
    if (process.env.MODE === 'development') {
      // Development: load from source directory
      return fileURLToPath(
        new URL('../app/settings-renderer/settings.html', import.meta.url),
      );
    }
    // Production: load from extraResources in the resources folder
    return path.join(process.resourcesPath, 'app', 'settings-renderer', 'settings.html');
  }

  const windows = {
    main: {
      renderer:
        process.env.MODE === 'development' && Boolean(process.env.VITE_DEV_SERVER_URL)
          ? new URL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173')
          : {
              path: fileURLToPath(
                new URL('../app/renderer/dist/index.html', import.meta.url),
              ),
            },
      preload: {
        path: fileURLToPath(new URL('../app/preload/dist/exposed.mjs', import.meta.url)),
      },
    },
    settings: {
      // 🔧 We point to the correct HTML file for both dev and production
      renderer: {
        path: getSettingsHtmlPath(),
      },
      // 🔧 And the new preload script
      preload: {
        path: fileURLToPath(
          new URL('../app/settings-preload/dist/exposed.mjs', import.meta.url),
        ),
      },
    },
  };

  // noinspection JSIgnoredPromiseFromCall
  initApp({
    // 🔧 Pass the whole windows object
    windows,
    // We still need a default entry for the first window
    renderer: windows.main.renderer,
    preload: windows.main.preload,
  });
})();

if (
  process.env.NODE_ENV === 'development' ||
  process.env.PLAYWRIGHT_TEST === 'true' ||
  Boolean(process.env.CI)
) {
  function showAndExit(...args) {
    console.error(...args);
    process.exit(1);
  }

  process.on('uncaughtException', showAndExit);
  process.on('unhandledRejection', showAndExit);
}
