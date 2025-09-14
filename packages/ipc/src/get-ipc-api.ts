import type { IpcApi } from './types';

// Declare window for TypeScript in renderer context
declare const window: any;

// Get the IPC API from the exposed preload functions
export function getIpcApi(): IpcApi | null {
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
