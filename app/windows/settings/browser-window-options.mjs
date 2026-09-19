import { fileURLToPath } from 'node:url';

const icon = fileURLToPath(new URL('../../../buildResources/icon.png', import.meta.url));

/** @type {import('electron').BaseWindowConstructorOptions} */
export default {
  width: 1024,
  height: 768,
  icon,
};
