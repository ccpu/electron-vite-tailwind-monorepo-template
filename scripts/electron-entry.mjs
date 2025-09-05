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
  // @ts-ignore
  const mainDist = await import('../app/main/dist/index.js');
  const { initApp } = mainDist;

  // noinspection JSIgnoredPromiseFromCall
  initApp({
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
  });
})();

if (
  process.env.NODE_ENV === 'development' ||
  process.env.PLAYWRIGHT_TEST === 'true' ||
  Boolean(process.env.CI)
) {
  /**
   * @param {...any} args
   */
  function showAndExit(...args) {
    console.error(...args);
    process.exit(1);
  }

  process.on('uncaughtException', showAndExit);
  process.on('unhandledRejection', showAndExit);
}
