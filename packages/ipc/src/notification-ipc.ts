import { ipcRenderer } from 'electron';

// IPC Notification API
const notificationIpc = {
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

export { notificationIpc };
