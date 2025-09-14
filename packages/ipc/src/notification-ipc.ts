import type { IpcRenderer } from 'electron';
import type { IpcApi } from './types';

// Factory function to create notification IPC with provided ipcRenderer
export function createNotificationIpcWithRenderer(ipcRenderer: IpcRenderer): IpcApi {
  return {
    // Custom notification with title and body
    showNotification: (
      title: string,
      body: string,
    ): Promise<{ success: boolean; message: string }> =>
      ipcRenderer.invoke('show-notification', title, body),

    // Simple message notification
    notifyMessage: (message: string): Promise<{ success: boolean; message: string }> =>
      ipcRenderer.invoke('notify-message', message),

    // Info notification
    notifyInfo: (info: string): Promise<{ success: boolean; message: string }> =>
      ipcRenderer.invoke('notify-info', info),
  };
}

// Placeholder export for when electron is not available
// This will be replaced by the preload script
export const notificationIpc: IpcApi = {
  showNotification: async () => ({ success: false, message: 'IPC not available' }),
  notifyMessage: async () => ({ success: false, message: 'IPC not available' }),
  notifyInfo: async () => ({ success: false, message: 'IPC not available' }),
};
