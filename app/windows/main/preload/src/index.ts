import { ipcRenderer } from 'electron';
import { sha256sum } from './nodeCrypto';
import { versions } from './versions';

function send(channel: string, message: string): Promise<any> {
  return ipcRenderer.invoke(channel, message);
}

// IPC Notification API
const ipcApi = {
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

export { ipcApi, send, sha256sum, versions };
