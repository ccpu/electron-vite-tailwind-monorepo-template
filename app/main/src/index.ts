import type { AppInitConfig } from './AppInitConfig';
import { createModuleRunner } from './ModuleRunner';
import { terminateAppOnLastWindowClose } from './modules/ApplicationTerminatorOnLastWindowClose';
import { autoUpdater } from './modules/AutoUpdater';
import { allowInternalOrigins } from './modules/BlockNotAllowdOrigins';
import { allowExternalUrls } from './modules/ExternalUrls';
import { hardwareAccelerationMode } from './modules/HardwareAccelerationModule';
import { createIpcNotificationModule } from './modules/IpcNotification';
import { createWindowManagerModule } from './modules/MainWindowManager';
import { disallowMultipleAppInstance } from './modules/SingleInstanceApp';

export async function initApp(initConfig: AppInitConfig): Promise<void> {
  const moduleRunner = createModuleRunner()
    .init(createIpcNotificationModule())
    .init(createWindowManagerModule({ initConfig, openDevTools: import.meta.env.DEV }))
    .init(disallowMultipleAppInstance())
    .init(terminateAppOnLastWindowClose())
    .init(hardwareAccelerationMode({ enable: false }))
    .init(autoUpdater())

    // Install DevTools extension if needed
    // .init(chromeDevToolsExtension({extension: 'VUEJS3_DEVTOOLS'}))

    // Security
    .init(
      allowInternalOrigins(
        new Set(initConfig.renderer instanceof URL ? [initConfig.renderer.origin] : []),
      ),
    )
    .init(
      allowExternalUrls(
        new Set(
          initConfig.renderer instanceof URL
            ? ['https://vite.dev', 'https://react.dev']
            : [],
        ),
      ),
    );

  await moduleRunner;
}
