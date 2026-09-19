import { fileURLToPath } from 'node:url';

// Resolved from this file so the same path works from the repo and from inside
// the packaged asar. electron-builder dresses the executable and the installer
// from `buildResources/`; this is what puts the icon on the window itself, in
// the taskbar and on `pnpm start`.
const icon = fileURLToPath(new URL('../../../buildResources/icon.png', import.meta.url));

/** @type {import('electron').BaseWindowConstructorOptions} */
export default {
  width: 1024,
  height: 768,
  icon,
};
