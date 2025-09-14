/**
 * Utility to access the IPC Notification API exposed through the preload script
 * The preload script exposes functions with base64 encoded names for security
 */

export interface IpcApi {
  showNotification: (
    title: string,
    body: string,
  ) => Promise<{ success: boolean; message: string }>;
  notifyMessage: (message: string) => Promise<{ success: boolean; message: string }>;
  notifyInfo: (info: string) => Promise<{ success: boolean; message: string }>;
}
