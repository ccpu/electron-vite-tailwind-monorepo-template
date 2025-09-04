/**
 * Utility to access the IPC Notification API exposed through the preload script
 * The preload script exposes functions with base64 encoded names for security
 */

interface IpcApi {
  showNotification: (
    title: string,
    body: string,
  ) => Promise<{ success: boolean; message: string }>;
  notifyMessage: (message: string) => Promise<{ success: boolean; message: string }>;
  notifyInfo: (info: string) => Promise<{ success: boolean; message: string }>;
}

// Get the IPC API from the exposed preload functions
function getIpcApi(): IpcApi | null {
  try {
    // The preload script exposes functions with base64 encoded names
    // We need to decode 'ipcApi' to get the actual function
    const encodedKey = btoa('ipcApi');
    const windowWithApi = window as unknown as Record<string, unknown>;
    const ipcApi = windowWithApi[encodedKey] as IpcApi | undefined;

    if (ipcApi === undefined) {
      console.warn('IPC API not available - running outside Electron context');
      return null;
    }

    return ipcApi;
  } catch (error) {
    console.error('Failed to access IPC API:', error);
    return null;
  }
}

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
