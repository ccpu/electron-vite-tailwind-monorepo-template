// Part 5: Your API definition

import { createIpcSchema, defineHandler } from 'electron-ipc-typesafe';

export const appApi = createIpcSchema({
  apiKey: 'appApi',
  handlers: {
    'show-notification': defineHandler<
      [title: string, body: string],
      { success: true; message: string }
    >(),
    'notify-message': defineHandler<
      [message: string],
      { success: true; message: string }
    >(),
    'notify-info': defineHandler<[info: string], { success: true; message: string }>(),
    'open-window': defineHandler<
      [windowName: string, options?: Electron.BrowserWindowConstructorOptions],
      { success: boolean; message: string }
    >(),
  },
});
