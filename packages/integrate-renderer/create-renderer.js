import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const packageJson = JSON.parse(readFileSync('../../package.json', 'utf8'));

const viteVersion = packageJson.devDependencies['create-vite'] ?? 'latest';
const templateIndex = process.argv.findIndex((arg) => arg.startsWith('--template'));
let template = templateIndex !== -1 ? process.argv[templateIndex + 1] : '';
template = template ? `-- --template ${template}` : '';
try {
  execSync(`npm create vite@${viteVersion} renderer ${template}`, { stdio: 'inherit' });
} catch (error) {
  console.error(
    'Failed to execute the `npm create vite` command. Please check the Vite version, template, and your network connection.',
  );
  console.error('Error details:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}
