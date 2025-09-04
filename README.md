# React Electron Vite Monorepo Template

<!-- ![GitHub last commit](https://img.shields.io/github/last-commit/ccpu/electron-vite-tailwind-monorepo-template?label=last%20update)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/ccpu/electron-vite-tailwind-monorepo-template/dev/electron)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/ccpu/electron-vite-tailwind-monorepo-template/dev/electron-builder)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/ccpu/electron-vite-tailwind-monorepo-template/dev/vite?filename=packages%2Fmain%2Fpackage.json)
![GitHub package.json dev/peer/optional dependency version](https://img.shields.io/github/package-json/dependency-version/ccpu/electron-vite-tailwind-monorepo-template/dev/playwright) -->

This is a modern, secure React Electron application template built with **pnpm monorepo**, **Turbo**, **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Vitest**. Written following the latest security requirements, recommendations, and best practices for Electron development.

> This template is specifically designed for React applications and comes with React pre-configured. It's based on the excellent [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) template by [cawa-93](https://github.com/cawa-93).

## ✨ Features

### 🚀 Modern Development Stack

- **⚡ Vite** - Lightning fast build tool and dev server
- **⚛️ React 19** - Latest React with modern features and pre-configured setup
- **🏗️ TypeScript** - Type safety and better DX
- **🎨 Tailwind CSS v4** - Utility-first CSS framework with latest features
- **🧪 Vitest** - Fast unit testing framework
- **🎭 Playwright** - End-to-end testing

### 📦 Monorepo with Modern Tooling

- **📁 pnpm workspace** - Fast, disk-efficient package manager
- **🏃 Turbo** - High-performance build system for monorepos
- **🔗 Workspace dependencies** - Shared tooling and configurations
- **📊 Dependency catalog** - Centralized dependency management

### 🔒 Security & Best Practices

## Get started

Follow these steps to get started with the React Electron template:

1. Click the **[Use this template](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/generate)** button (you must be logged in) or clone this repo:

   ```bash
   git clone https://github.com/ccpu/electron-vite-tailwind-monorepo-template.git
   cd electron-vite-tailwind-monorepo-template
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start development server:

   ```bash
   pnpm start
   ```

4. Build for production:
   ```bash
   pnpm run compile
   ```

That's all you need! 🎉

> [!NOTE]
> This template comes with React pre-configured and ready to use. No additional setup or renderer creation is needed - just start coding your React application!

> [!TIP]
> You can explore the demo application for various frameworks and operating systems in the [Deployment](https://github.com/ccpu/electron-vite-tailwind-monorepo-template/deployments) section.
> This will allow you to see how the application performs across different environments.
> Additionally, you can verify the auto-update functionality by installing an outdated version of the application.

❤️ **If you like this template, give it a ⭐!**

## 🏗️ Project Structure

This project uses a **monorepo architecture** with **pnpm workspaces** and **Turbo** for efficient development and building. Each package is independent and can have its own tech stack, tests, dependencies, and frameworks.

```
📁 app/
├── 📱 main/          # Electron main process
├── 🔌 preload/       # Electron preload scripts
└── 🖥️ renderer/      # React frontend with Tailwind CSS

📁 packages/
├── 🛠️ dev-mode/      # Development mode utilities
├── 🚀 electron-entry/ # Electron entry point
├── 📊 electron-versions/ # Electron version management
└── 🎨 ui/            # Shared UI components library

📁 tooling/           # Shared development tools
├── 🧹 eslint/        # ESLint configurations
├── 💅 prettier/      # Prettier configurations
├── 📘 typescript/    # TypeScript configurations
└── 🧪 vitest/        # Vitest configurations

```

### Package Details:

#### Core Application Packages:

- **[`app/main`](app/main)** - Electron [**main process**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file) with TypeScript
- **[`app/preload`](app/preload)** - Electron [**preload scripts**](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload) for secure IPC
- **[`app/renderer`](app/renderer)** - React frontend with Tailwind CSS, Vite, and modern tooling

#### Additional Packages:

- **[`packages/dev-mode`](packages/dev-mode)** - Development mode utilities
- **[`packages/electron-entry`](packages/electron-entry)** - Electron entry point
- **[`packages/electron-versions`](packages/electron-versions)** - Electron version management
- **[`packages/ui`](packages/ui)** - Shared UI components library

#### Development Tools:

- **[`tooling/eslint`](tooling/eslint)** - Shared ESLint configurations for all packages
- **[`tooling/prettier`](tooling/prettier)** - Code formatting configurations
- **[`tooling/typescript`](tooling/typescript)** - TypeScript configurations for different package types
- **[`tooling/vitest`](tooling/vitest)** - Testing configurations and utilities

> [!NOTE]
> All internal packages are prefixed with `@app/*` or `@internal/*` for clear organization and to avoid naming conflicts with external dependencies.

## 🔧 How It Works

### 📦 Building for Production

When your application is ready for distribution, you can compile it into an executable using [electron-builder]:

- **Local build**: Run `pnpm run compile` to create a distributable application locally
- **Auto-updates**: For production releases with auto-update support, use the GitHub Actions workflow in [`.github/workflows/release.yml`](.github/workflows/release.yml)

> [!TIP]
> This template is configured to use GitHub Releases for distributing updates, but you can configure other distribution methods.
> See the [electron-builder documentation](https://www.electron.build/configuration/publish) for more options.

### 🧪 Testing Strategy

#### Unit Testing with Vitest

Each package can include unit tests using Vitest:

```bash
# Run tests for all packages
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

#### End-to-End Testing with Playwright

E2E tests are located in the [`tests`](tests) directory and test the complete compiled application:

```bash
# Run E2E tests (requires compiled app)
pnpm run test:e2e
```

### 🔗 Working with Dependencies

#### Frontend Dependencies (React Renderer)

The renderer package is a React application with Tailwind CSS. You can use any browser-compatible dependencies:

- ✅ React ecosystem libraries (React Router, React Query, Zustand, etc.)
- ✅ Lodash, Axios, Date-fns
- ✅ UI libraries (Material-UI, Chakra UI, Ant Design, etc.)
- ✅ Additional CSS frameworks or utilities
- ✅ Any npm packages compatible with modern React

#### Node.js Dependencies (Main & Preload)

For Node.js APIs and system-level functionality, use dependencies in the main or preload packages:

- ✅ File system operations
- ✅ Database connections
- ✅ Native modules
- ✅ System information libraries

> [!IMPORTANT] > **Security Rule**: Never use Node.js APIs directly in the renderer. Always expose them through the preload script using `contextBridge.exposeInMainWorld()`.

### 🌐 Environment Variables & Configuration

All environment variables are available through `import.meta.env` in Vite-powered packages:

```typescript
// Access environment variables
const isDev = import.meta.env.DEV;
const apiUrl = import.meta.env.VITE_API_URL;
```

#### Environment Files

Environment variables are loaded from these files (in order of priority):

```
.env                # Loaded in all environments
.env.local          # Loaded in all environments (gitignored)
.env.[mode]         # Loaded in specific mode only
.env.[mode].local   # Loaded in specific mode only (gitignored)
```

#### Mode Configuration

- **`development`** - Used by `pnpm start`
- **`production`** - Used by `pnpm run build` and `pnpm run compile`

> [!IMPORTANT]
> Only variables prefixed with `VITE_` are exposed to the renderer process for security reasons.

Example `.env` file:

```bash
# ❌ Not exposed to renderer (server-side only)
DATABASE_URL=postgresql://localhost:5432/myapp

# ✅ Exposed to renderer (prefixed with VITE_)
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

> [!TIP]
> Add TypeScript definitions for your environment variables in [`types/env.d.ts`](types/env.d.ts) for better IntelliSense.

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm start

# Start development server for specific package
pnpm --filter @app/renderer dev
```

### Building

```bash
# Build all packages
pnpm run build

# Build and compile into executable
pnpm run compile

# Compile with debug options (no asar, no installer)
pnpm run compile -- --dir -c.asar=false
```

### Testing

```bash
# Run all tests (unit + integration)
pnpm test

# Run E2E tests on compiled app
pnpm run test:e2e

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### Code Quality

```bash
# Run TypeScript type checking
pnpm run typecheck

# Lint all packages
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code with Prettier
pnpm run format

# Fix formatting issues
pnpm run format:fix

# Run all fixes (format + lint)
pnpm run fix:all
```

### Maintenance

```bash
# Clean all build outputs
pnpm run clean:workspaces

# Clean and reinstall dependencies
pnpm run clean:workspaces:install

# Update dependencies
pnpm run deps:update

# Update dependencies (including major versions)
pnpm run deps:update:major
```

### Monorepo Management

```bash
# Check workspace dependency conflicts
pnpm run lint:ws

# Initialize Turbo generators
pnpm run turbo:gen:init
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This template is based on the excellent work by [cawa-93](https://github.com/cawa-93) from the original [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) repository.

The original template provided the foundation for secure Electron development with Vite, and this version extends it with React-specific features, modern monorepo tooling, and enhanced developer experience.

**Key Changes from Original:**

- ⚛️ **React-focused**: Pre-configured with React 19, removing multi-framework support for simplicity
- 🏗️ **Monorepo Structure**: Added pnpm workspace and Turbo for better organization
- 🎨 **Tailwind CSS v4**: Integrated latest Tailwind CSS with modern features
- 🧪 **Enhanced Testing**: Added Vitest and React Testing Library setup
- 📦 **Simplified CI/CD**: Removed renderer creation logic, focusing on React-only builds

**Special thanks to:**

- [cawa-93](https://github.com/cawa-93) for creating the original secure Electron + Vite template
- The Electron team for their security guidance and best practices
- The Vite team for the amazing build tool
- The React team for the excellent frontend framework
- The entire open-source community for the tools that make this template possible

---

[vite]: https://github.com/vitejs/vite/
[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[playwright]: https://playwright.dev
[turbo]: https://turbo.build/
[pnpm]: https://pnpm.io/
[tailwindcss]: https://tailwindcss.com/
[vitest]: https://vitest.dev/
