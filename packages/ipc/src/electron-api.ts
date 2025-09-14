import { getIpcApi } from './get-ipc-api';

// Export a convenient API object
export const electronAPI = {
  isElectron: (): boolean => getIpcApi() !== null,
  ipc: getIpcApi(),

  // Convenience methods with error handling for notifications
  async showNotification(
    title: string,
    body: string,
  ): Promise<{ success: boolean; message: string }> {
    const api = getIpcApi();
    if (!api) throw new Error('IPC API not available');
    return api.showNotification(title, body);
  },

  async notifyMessage(message: string): Promise<{ success: boolean; message: string }> {
    const api = getIpcApi();
    if (!api) throw new Error('IPC API not available');
    return api.notifyMessage(message);
  },

  async notifyInfo(info: string): Promise<{ success: boolean; message: string }> {
    const api = getIpcApi();
    if (!api) throw new Error('IPC API not available');
    return api.notifyInfo(info);
  },
};
