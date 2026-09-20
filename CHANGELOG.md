## [1.0.2](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/compare/v1.0.1...v1.0.2) (2026-09-20)


### Bug Fixes

* **AutoUpdater:** prevent updates during Playwright tests ([a554ee5](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/a554ee50ec989d09633d33d23ff5a20afcf431a8))

## [1.0.1](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/compare/v1.0.0...v1.0.1) (2026-09-20)


### Bug Fixes

* improve app version stamping logic in CI workflow ([d66b0f4](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/d66b0f4bdbe55f00bfaec3bf17381b9c3ea91f3c))

# 1.0.0 (2026-09-20)


### Bug Fixes

* **action:** change Install Dependencies step to use pnpm install ([338ea39](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/338ea3915a0e5e00e8b6f9611fb35571df120bd7))
* **action:** update Install dependencies step to use --no-frozen-lockfile ([1817d76](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/1817d7661f918014fbf68e505af33ea2cf91c368))
* **App:** correct button class order for consistent styling ([bca02e0](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/bca02e0a8da3fb1a16ff7e2d5f613571b71d1aa0))
* **App:** correct text in header from "Vite + Reacts" to "Vite + React" ([3e7ef8f](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/3e7ef8fb3d3a13f78ba18fa44aaad6a532d3b81e))
* **ci:** ensure GH_TOKEN is set in the compile job environment ([7fd3002](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/7fd300219fa55bb4177aaa2ff31947ca84f4f25b))
* **ci:** remove '.idea' paths from CI ignore list ([d010303](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/d010303430133fb818a4b84153ce25a4343f823d))
* **ci:** update token references from GITHUB_TOKEN to GH_TOKEN ([4a51392](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/4a51392de980e0452a3b12ebccb5b0f1cad6a451))
* correct relative paths in integrate-renderer scripts to work in CI ([43a6f21](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/43a6f21822103ed16074cf1af00c1b51deab370a))
* **dependencies:** remove unused `react-icons` dependency ([0200d15](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/0200d15cb2552f2c5c308fde2bedcf811b506d44))
* **dependencies:** update dependencies to use workspace references ([90a4213](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/90a421368485642e9040bd80ff9983eb5b7f4ac8))
* **dependencies:** update electron-vite-toolkit version to 0.6.0 ([5f11659](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/5f11659af22e6aa1e3e7bdf35c96760cb6dc592c))
* **dependencies:** update eslint and workspace-package-generator versions ([e823512](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/e8235122ad7606d635a39a1f45f6baf6b19e3dca))
* **deploy:** update GH_TOKEN reference to use secrets ([071d158](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/071d15863fba193c64fd234f56d2bd9a7530eb61))
* **integrate-renderer:** update path to renderer package ([7f3d0ec](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/7f3d0ecc439ebbf687d83de99ed4ad5c8a96277c))
* **launch:** update program path for debugging main process ([87690db](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/87690db5d1cadae5cbc93ed2bb4ca39487b31c1e))
* **lint:** update `lint:root` script to include `scripts` directory ([9e45036](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/9e450360eafa2d11216e180850f77e2c3d99c85f))
* **main:** ensure root element exists before rendering ([eb559f5](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/eb559f5ddfd2c118a66565ba9f5fdd3029c761f6))
* **package:** update clean script order in multiple package.json files ([5d36444](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/5d36444be9145a7610b0a04958043bbf4dcfaa26))
* **package:** update exports structure for renderer and preload ([c059cd6](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/c059cd6b2f71c04cf9d0c69fd9dd18ca7b7746b1))
* **pnpm:** update electron-vite-toolkit version in dev dependencies ([cbfd356](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/cbfd3562f12c7d8b3558928dd761a0facda6c326))
* **preload, renderer:** update `format` and `format:fix` scripts to use correct ignore paths ([53f001e](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/53f001e5d62fe51af72f9c9b3eda3804eba70ead))
* **preload:** remove unused `package copy.json` file ([8b60cf2](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/8b60cf20a10ff5e7e4a4c846c10725c7174cf840))
* prevent copying unwanted directories in create-new-window script ([3dd991d](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/3dd991dcefc836d05f43202747e578967766b697))
* **readme:** update project name placeholder in clean README template ([00c3a7d](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/00c3a7dd51eec82a5b0bea01da6e02c52031a71e))
* remove .js extensions from type imports ([a4adbd2](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/a4adbd27859a5d3dc153d57fba9952268d57055a))
* remove duplicate Install Dependencies step in action.yml ([ef2424f](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/ef2424f1cfe0a283999c5883a05039ba01bd3e9a))
* remove empty code change sections ([a7857dd](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/a7857dd64b6685c476488dfa67ad988a4c6c9506))
* **tests:** update globalThis access in e2e tests to use type assertion ([9db7e8e](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/9db7e8e9fe76bb02da97fb9fa77b253083f2244d))
* **tsconfig:** update include and exclude patterns ([c6eb40b](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/c6eb40be4c56531012d92591216b1fba3e3bd117))
* **tsconfig:** update watch configuration for TypeScript ([137d3f2](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/137d3f2a8813881db42f243351c939b33911fe85))


### Features

* **action:** add Turbo CLI installation and update lockfile step ([8d3ef96](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/8d3ef96bea979e2e2a58048044ff0ff4edb2b249))
* **action:** enhance setup project action with new inputs and build step ([537ae0e](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/537ae0ece60e73fb5556f5c3bdf447b53e4b0ab1))
* **builder:** enhance build process and add PascalCase conversion ([64a7be4](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/64a7be452cb0f6ec87ade1a19d8a51c4571ae826))
* **config:** introduce internal configs package and refactor app configuration ([36ab4cf](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/36ab4cfdad5ec28953d642c15497a0463aa8c199))
* **create-new-window:** automate dependency installation ([7d347d5](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/7d347d558c8c3ea8d9830113a3399504b0f86d01))
* **dependencies:** add @internal/ipc to multiple package.json files ([ca3ba61](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/ca3ba61bd1af00f3a5a203d72e7e96b4723d500a))
* **dependencies:** add internal IPC package to devDependencies ([50cf5ca](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/50cf5ca6c4a77d60df94dec463a1e77b105cde05))
* first commit ([b7ccea6](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/b7ccea6f68132ae689168f33a9847d8802da43e7))
* **generators:** add package generator and update README ([bc75c9a](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/bc75c9aecfec30a5a8060653716905ee25b67d98))
* **icons:** add SVG icon and script for generating rasterized icons ([04fd88f](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/04fd88fe6c7d4588f9a6ee81d27bb6f7f93fb926))
* implement multi-window architecture with dynamic templates ([74c7a0f](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/74c7a0f5fda493b347395894a5d2fdb57438dc79))
* Implement WindowStateManager for managing window states ([4eeeaac](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/4eeeaacd4fa6b06d52f327d540b3f18132bdaad1))
* **ipc:** add IPC module with notification API and related configurations ([cfc9cb9](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/cfc9cb96bc96e99dbb6312207bf75cfbec1b5bc6))
* **ipc:** implement createIpcBridge ([4ae836f](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/4ae836fb9a20a9c79811a986902d32479a2d2f2f))
* **ipc:** implement IPC Notification API and refactor related components ([ed958c5](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/ed958c5f0d220b792de48e7123794096a9349a25))
* **ipc:** integrate notification IPC in preload scripts ([b1e7b97](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/b1e7b976d34b6b5162d19fed4aecf629a21b1c58))
* **launch:** update debug configuration for hot reload ([3a1bdc6](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/3a1bdc6d1f69c6229210dfb1087090e91dd8d1db))
* **main:** update launch configuration and add WindowManager module ([b8c5fe6](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/b8c5fe6e18e37419053eec9278eba8e0b0060087))
* **renderer:** initialize renderer package with React, TypeScript, Vite, and Tailwind CSS ([1076793](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/1076793e1fa70fec41a57aa31a6069c698090f0c))
* **setup:** add setup script and clean README template ([08dfbde](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/08dfbde0d386145c394a215008f76ee5d4c3917e))
* simplify template for React applications ([1469738](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/1469738141d2aca049383a9fd20e3111c0068dc6))
* **tailwind:** integrate shared Tailwind CSS configuration ([3e7fb42](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/3e7fb422a566a530f544d352dc93e6aeba954681))
* **ui:** refactor theme management by consolidating ThemeProvider ([e33be12](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/e33be12e4a9bc4196d51d3c689a2f9d97c130b76))
* **vitest:** add TypeScript definitions for vitest configuration ([b77c123](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/b77c123e7e49a9504705eb37cb02ac716b2c5e7a))
* **window:** add interactive window creation script ([ed8ac2d](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/ed8ac2d7bec32e7e774bacd8302fb03e3424ae08))
* **WindowManager:** enhance window management and add settings button ([7e67665](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commit/7e6766564eefa1170e559306219fa292b2c49053))

# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-01-XX

### 🎯 React-Focused Simplification

**BREAKING CHANGES**: This release simplifies the template to focus exclusively on React applications.

#### ✨ Changes Made

- **🔧 Simplified CI/CD**: Removed multi-framework testing and renderer creation logic
  - Updated GitHub Actions to remove `renderer-template` inputs
  - Renamed `init-template-with-renderer` action to `setup-project`
  - Streamlined CI workflows to focus on React-only builds
- **📦 Package Cleanup**: Removed unnecessary packages
  - Deleted `packages/integrate-renderer` package
  - Removed `create-renderer` and `integrate-renderer` scripts from root package.json
- **📚 Updated Documentation**:
  - Updated README to reflect React-specific nature
  - Added clear acknowledgment of the original template
  - Simplified setup instructions (no renderer creation needed)
- **🎯 Project Naming**: Updated project name to `react-electron-vite-monorepo-template`

#### 🎯 Why This Change?

This template is now specifically designed for developers who want to build React Electron applications without the complexity of multi-framework support. The React renderer is pre-configured and ready to use.

#### 🚀 Migration Guide

If you're upgrading from a previous version:

1. The React renderer is already included - no setup needed
2. Remove any references to `create-renderer` or `integrate-renderer` scripts
3. CI/CD workflows no longer need `renderer-template` parameters

---

## [1.0.0] - 2025-03-09

### 🎉 Initial Release

This is the initial release of the **Electron Vite Monorepo Template**, a modernized version based on the excellent [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) template by [cawa-93](https://github.com/cawa-93).

### ✨ New Features

#### 📦 Monorepo Architecture

- **pnpm workspace** - Fast, disk-efficient package manager with workspace support
- **Turbo** - High-performance build system for monorepos with intelligent caching
- **Dependency catalog** - Centralized dependency management across packages
- **Workspace dependencies** - Shared tooling and configurations

#### 🚀 Modern Frontend Stack

- **React 19** - Latest React with modern features and concurrent rendering
- **TypeScript** - Full type safety across all packages
- **Tailwind CSS v4** - Modern utility-first CSS framework with latest features
- **Vite** - Lightning-fast development server and build tool

#### 🧪 Testing & Quality

- **Vitest** - Fast, Vite-powered unit testing framework
- **React Testing Library** - Simple and complete testing utilities
- **Playwright** - End-to-end testing for the complete application
- **ESLint + Prettier** - Code quality and formatting tools
- **TypeScript strict mode** - Enhanced type checking

#### 🔧 Development Experience

- **Hot Module Replacement** - Instant feedback during development
- **Theme system** - Built-in dark/light/system theme support
- **Pre-commit hooks** - Automated code quality checks
- **VS Code integration** - Optimized for Visual Studio Code

#### 🔒 Security & Performance

- **Latest Electron** - Uses Electron 38.x with latest security patches
- **Context isolation** - Proper separation between main, preload, and renderer
- **Secure IPC** - Modern ES modules approach for inter-process communication
- **Code splitting** - Optimized bundle sizes

#### 🚀 Production Ready

- **Auto-update** - Built-in update mechanism with electron-updater
- **Code signing ready** - Prepared for production code signing
- **GitHub Actions** - CI/CD workflows for testing, building, and releases
- **Cross-platform builds** - Support for Windows, macOS, and Linux

### 📁 Package Structure

```
packages/
├── main/           # Electron main process (TypeScript)
├── preload/        # Preload scripts for secure IPC
└── renderer/       # React frontend with Tailwind CSS

tooling/           # Shared development tools
├── eslint/        # ESLint configurations
├── prettier/      # Prettier configurations
├── typescript/    # TypeScript configurations
└── vitest/        # Vitest testing configurations
```

### 🔄 Migration from Original Template

This template maintains compatibility with the original `vite-electron-builder` while adding:

- **pnpm** instead of npm for package management
- **Turbo** for build orchestration and caching
- **Monorepo structure** with workspace packages
- **Tailwind CSS** for modern styling
- **Vitest** for testing
- **Enhanced TypeScript** configurations
- **React 19** with latest features

### 🙏 Acknowledgments

This template is based on the excellent [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) by [cawa-93](https://github.com/cawa-93). Special thanks for creating the foundation of secure Electron development with Vite.

### 📝 Breaking Changes

- **Package manager**: Requires pnpm instead of npm
- **Node.js**: Minimum version requirement updated to 22.14.0
- **Repository structure**: Monorepo architecture with workspace packages
- **Scripts**: Updated to use pnpm and turbo commands

### 🐛 Known Issues

- TypeScript definitions for testing libraries need to be installed via `pnpm install`
- Some GitHub Actions workflows may need adjustment for your specific repository

### 📚 Documentation

- Updated README.md with comprehensive guide
- Added package-specific documentation
- Included testing examples and best practices
- Enhanced architecture documentation

---

**Full Changelog**: https://github.com/ccpu/electron-vite-tailwind-monorepo-template/commits/main
