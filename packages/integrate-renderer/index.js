import * as fs from 'node:fs';
import { dirname, join } from 'node:path';
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const rendererPkgPath = join(dir, '../renderer/package.json');
const pkgJson = JSON.parse(fs.readFileSync(rendererPkgPath, 'utf8'));

const indent = 2;

(async () => {
  const step = createStepLogger();

  await step(
    'Changing renderer package name to "@app/renderer"',
    changeRendererPackageName,
  );

  await step('Add "--base=./" flag to vite build command', addTheBaseFlagToBuildCommand);

  await step(
    'Change the "main" and "exports" property to "./dist/index.html"',
    addTheMainProperty,
  );
})();

function changeRendererPackageName() {
  if (pkgJson?.name === '@app/renderer') {
    return true;
  }
  pkgJson.name = '@app/renderer';
  savePkg();
  return true;
}

function addTheBaseFlagToBuildCommand() {
  if (!pkgJson?.scripts?.build) {
    console.warn('No build script found. Skip.');
    return false;
  }

  if (!pkgJson.scripts.build.includes('vite build')) {
    console.warn(
      'The build script is founded but it was not recognized as "vite build" command. Skip.',
    );
    return false;
  }

  if (pkgJson.scripts.build.includes('--base')) {
    console.warn('The "--base" flag already exists. Skip.');
    return false;
  }

  pkgJson.scripts.build = pkgJson.scripts.build.replaceAll(
    'vite build',
    'vite build --base ./',
  );
  savePkg();
  return true;
}

function addTheMainProperty() {
  if (pkgJson.main) {
    console.warn('The "main" property already exists. Skip.');
    return false;
  }

  pkgJson.main = './dist/index.html';
  pkgJson.exports = { ...(pkgJson?.exports ?? {}), '.': { default: pkgJson.main } };
  savePkg();
  return true;
}

function createStepLogger() {
  console.warn('\n\n\n\n----------');
  console.warn('Default vite project has been successfully created.');
  console.warn(
    'However, additional modifications to the default vite project are now being implemented',
  );
  console.warn('to ensure compatibility with the template.');
  console.warn('All changes are detailed below.');
  console.warn('\n');

  let stepNumber = 1;

  return async function (
    /** @type {string} */ message,
    /** @type {() => void} */ callback,
  ) {
    const stepMessage = `${stepNumber++}. ${message}`;

    console.warn(stepMessage);
    try {
      callback();
    } catch (error) {
      console.error(error);
      exit(1);
    }
  };
}

function savePkg() {
  fs.writeFileSync(rendererPkgPath, JSON.stringify(pkgJson, null, indent), {
    encoding: 'utf8',
  });
}
