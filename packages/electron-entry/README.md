# @app/electron-entry

Main entry point for the Electron application.

## Description

This package contains the main entry point that bootstraps the Electron application. It resolves the main, renderer, and preload modules and initializes the app with the appropriate configuration based on the environment (development or production).

## Usage

```bash
# Run the application
npm run start
# or
node index.mjs
```

## What it does

1. Imports the main module from `@app/main`
2. Configures the renderer path (dev server URL in development, dist files in production)
3. Configures the preload script path
4. Initializes the Electron application with the configuration
5. Sets up error handling for development and CI environments

## Environment Variables

- `MODE`: Set to 'development' for development mode
- `VITE_DEV_SERVER_URL`: URL of the Vite development server (development only)
- `NODE_ENV`: Node environment
- `PLAYWRIGHT_TEST`: Set to 'true' when running E2E tests
- `CI`: Set when running in CI environment

## Scripts

- `start`: Run the application entry point
- `lint`: Run ESLint
- `format`: Check code formatting with Prettier
- `format:fix`: Fix code formatting with Prettier
- `typecheck`: Run TypeScript type checking
- `test`: Run tests with Vitest
- `clean`: Clean cache and node_modules
