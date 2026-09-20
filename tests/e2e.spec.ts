/* eslint-disable no-restricted-properties */
import type { BrowserWindow } from 'electron';
import type { ElectronApplication, JSHandle } from 'playwright';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { platform } from 'node:process';
import { test as base, expect } from '@playwright/test';
import { globSync } from 'glob';
import { _electron as electron } from 'playwright';

// Playwright runs from the repo root, same as the `dist/*` globs below.
const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { name: string };
const userDataDirectory = mkdtempSync(join(tmpdir(), 'electron-e2e-'));

/**
 * electron-builder derives `productName` from the package name, and names the
 * packaged executable after it. Keep in step with `electron-builder.mjs`.
 */
const productName = pkg.name
  .split(/[^a-z0-9]+/iu)
  .filter(Boolean)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

function resolveExecutablePath(): string {
  const patternsByPlatform: Record<string, string[]> = {
    darwin: [
      `dist/mac*/${productName}.app/Contents/MacOS/${productName}`,
      'dist/mac*/*.app/Contents/MacOS/*',
    ],
    win32: [`dist/win-unpacked/${productName}.exe`, 'dist/win-unpacked/*.exe'],
  };

  /*
   * On Linux electron-builder falls back to `sanitizedName.toLowerCase()` for
   * the executable name, which is neither `productName` nor the package name
   * verbatim -- so every spelling it can land on is tried in turn.
   */
  const patterns = patternsByPlatform[platform] ?? [
    `dist/linux-unpacked/${pkg.name}`,
    `dist/linux-unpacked/${productName}`,
    `dist/linux-unpacked/${productName.toLowerCase()}`,
    `dist/linux-unpacked/${productName.replaceAll(' ', '')}`,
  ];

  for (const pattern of patterns) {
    const [match] = globSync(pattern);
    if (match) return match;
  }

  throw new Error(
    `App executable not found for platform "${platform}". Searched: ${patterns.join(
      ', ',
    )}. Run "pnpm run compile" first.`,
  );
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
process.env.PLAYWRIGHT_TEST = 'true';

// Declare the types of your fixtures.
interface TestFixtures {
  electronApp: ElectronApplication;
  electronVersions: NodeJS.ProcessVersions;
}

const test = base.extend<TestFixtures>({
  electronApp: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const executablePath = resolveExecutablePath();

      /*
       * A stray ELECTRON_RUN_AS_NODE in the environment boots the packaged app
       * as plain Node, which then rejects Playwright's --remote-debugging-port
       * with an opaque "Process failed to launch!".
       */
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      const { ELECTRON_RUN_AS_NODE: _runAsNode, ...env } = process.env;

      const electronApp = await electron.launch({
        executablePath,
        args: ['--no-sandbox', `--user-data-dir=${userDataDirectory}`],
        env: env as Record<string, string>,
      });

      electronApp.on('console', (msg) => {
        if (msg.type() === 'error') {
          console.error(`[electron][${msg.type()}] ${msg.text()}`);
        }
      });

      await use(electronApp);

      // This code runs after all the tests in the worker process.
      await electronApp.close();
    },
    { scope: 'worker', auto: true } as any,
  ],

  page: async ({ electronApp }, use) => {
    const page = await electronApp.firstWindow();
    // capture errors
    page.on('pageerror', (error) => {
      console.error(error);
    });
    // capture console messages
    page.on('console', (msg) => {
      // eslint-disable-next-line no-console
      console.log(msg.text());
    });

    await page.waitForLoadState('load');
    await use(page);
  },

  electronVersions: async ({ electronApp }, use) => {
    await use(await electronApp.evaluate(() => process.versions));
  },
});

test('Main window state', async ({ electronApp, page }) => {
  const window: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
  const windowState = await window.evaluate(
    (
      mainWindow,
    ): Promise<{ isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean }> => {
      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        /**
         * The main window is created hidden, and is shown only when it is ready.
         * See {@link ../packages/main/src/mainWindow.ts} function
         */
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once('ready-to-show', () => resolve(getState()));
        }
      });
    },
  );

  expect(windowState.isCrashed, 'The app has crashed').toEqual(false);
  expect(windowState.isVisible, 'The main window was not visible').toEqual(true);
  expect(windowState.isDevToolsOpened, 'The DevTools panel was open').toEqual(false);
});

test.describe('Main window web content', async () => {
  test('The main window has an interactive button', async ({ page }) => {
    const element = page.getByRole('button', { name: /count is/u });
    await expect(element).toBeVisible();
    await expect(element).toHaveText('count is 0');
    await element.click();
    await expect(element).toHaveText('count is 1');
  });

  test('The main window has a vite logo', async ({ page }) => {
    const element = page.getByAltText('Vite logo');
    await expect(element).toBeVisible();
    await expect(element).toHaveRole('img');
    const imgState = await element.evaluate((img: HTMLImageElement) => img.complete);
    const imgNaturalWidth = await element.evaluate(
      (img: HTMLImageElement) => img.naturalWidth,
    );

    expect(imgState).toEqual(true);
    expect(imgNaturalWidth).toBeGreaterThan(0);
  });
});

/*
 * The preload re-exposes everything `preload/src/index.ts` exports, under a
 * base64 name. That module exports nothing -- it exposes `appApi` by hand -- so
 * `appApi` is the whole of the contract a renderer can see. The tests that used
 * to live here asserted on `versions`, `sha256sum` and `send` from the original
 * boilerplate preload, which this template no longer has.
 */
test.describe('Preload context should be exposed', async () => {
  test('exposes appApi on the renderer', async ({ page }) => {
    const type = await page.evaluate(
      () => typeof (globalThis as Record<string, unknown>).appApi,
    );
    expect(type).toEqual('object');
  });

  test('exposes the app API surface', async ({ page }) => {
    const keys = await page.evaluate(() =>
      Object.keys((globalThis as Record<string, unknown>).appApi as object),
    );
    expect(keys).toEqual(expect.arrayContaining(['invoke', 'openWindow']));
  });

  test('exposes the typed invoke namespace rather than a raw channel call', async ({
    page,
  }) => {
    const shape = await page.evaluate(() => {
      const api = (globalThis as Record<string, unknown>).appApi as Record<
        string,
        unknown
      >;
      return {
        invoke: typeof api.invoke,
        openWindow: typeof api.openWindow,
        showNotification: typeof api.showNotification,
      };
    });

    // `invoke` is the generated per-handler namespace, not a channel function,
    // so nothing in the renderer can name an arbitrary IPC channel.
    expect(shape).toEqual({
      invoke: 'object',
      openWindow: 'function',
      showNotification: 'function',
    });
  });
});
