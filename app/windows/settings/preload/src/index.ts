import { createNotificationIpcWithRenderer } from '@internal/ipc';
import { ipcRenderer } from 'electron';

const ipcApi = createNotificationIpcWithRenderer(ipcRenderer);

export { ipcApi };
