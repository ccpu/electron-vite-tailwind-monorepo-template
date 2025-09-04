# @app/dev-mode

Development mode orchestrator for the Electron application.

## Description

This package contains the development server script that orchestrates the development environment for the Electron application. It creates a Vite development server for the renderer process and builds other packages (preload and main) in watch mode.

## Usage

```bash
# Run the development server
npm run start
# or
node index.js
```

## What it does

1. Sets up development environment variables
2. Creates a Vite development server for the renderer package
3. Provides a plugin that allows other packages to access the renderer dev server
4. Builds preload and main packages in watch mode for hot reloading

## Dependencies

- **vite**: For creating and managing the development server

## Scripts

- `start`: Run the development server
- `lint`: Run ESLint
- `format`: Check code formatting with Prettier
- `format:fix`: Fix code formatting with Prettier
- `typecheck`: Run TypeScript type checking
- `test`: Run tests with Vitest
- `clean`: Clean cache and node_modules
