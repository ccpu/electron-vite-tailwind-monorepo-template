# IPC Notification System

This template includes a simple notification system for communicating between the Electron main process and the renderer process using IPC (Inter-Process Communication).

## Overview

The IPC notification system is set up using three main components:

1. **Main Process** (`packages/main/src/modules/IpcNotification.ts`) - Handles notification requests
2. **Preload Script** (`packages/preload/src/index.ts`) - Exposes safe notification APIs to the renderer
3. **Renderer Process** (`packages/renderer/src/electron-api.ts`) - Provides convenient access to notification APIs

## Notification Types

### 1. Custom Notification

Full control over the notification title and body.

**Usage:**

```typescript
import { electronAPI } from './electron-api';

const result = await electronAPI.showNotification('My Title', 'My custom message');
console.log(result.success); // true if notification was shown
```

### 2. Simple Message Notification

Quick notification with a predefined title "App Notification".

**Usage:**

```typescript
const result = await electronAPI.notifyMessage('Quick message here');
```

### 3. Info Notification

Information notification with "Info" as the title.

**Usage:**

```typescript
const result = await electronAPI.notifyInfo('Some important information');
```

## Architecture

### Security Considerations

The preload script uses `contextBridge.exposeInMainWorld()` to safely expose APIs to the renderer process. Function names are base64 encoded for additional security.

### Type Safety

TypeScript interfaces are defined for all notification APIs:

```typescript
interface IpcApi {
  showNotification: (
    title: string,
    body: string,
  ) => Promise<{ success: boolean; message: string }>;
  notifyMessage: (message: string) => Promise<{ success: boolean; message: string }>;
  notifyInfo: (info: string) => Promise<{ success: boolean; message: string }>;
}
```

### Error Handling

All notification calls include proper error handling and will throw errors if the APIs are not available (e.g., when running in a browser).

## Hot Reload Support

The development setup includes hot reload for the main process. When you make changes to the IPC notification handlers, Electron will automatically restart to apply the changes.

## Running the Examples

1. Start the development server:

   ```bash
   pnpm run start
   ```

2. The Notification Demo Card will appear in the Electron app (not in browser preview)

3. Test the different notification types by filling in the forms and clicking the buttons

## Browser vs Electron

The notification system only works when running in Electron. When viewing the app in a browser, the demo will show a message indicating that notifications are not available.

This allows for graceful degradation and easier development workflow.

## Adding New Notification Types

To add a new notification type, follow these steps:

1. **Add handler in main process** (`packages/main/src/modules/IpcNotification.ts`)
2. **Expose in preload script** (`packages/preload/src/index.ts`)
3. **Add to renderer API** (`packages/renderer/src/electron-api.ts`)
4. **Update TypeScript types** (`packages/renderer/src/vite-env.d.ts`)
