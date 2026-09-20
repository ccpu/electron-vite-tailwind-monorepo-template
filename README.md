# React Electron Vite Monorepo Template

A modern, secure React Electron application template built with **pnpm monorepo**, **Turbo**, **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Vitest**.

## ✨ Tech Stack


- **⚛️ React 19** - Latest React with modern features
- **🏗️ TypeScript** - Type safety and better DX
- **🎨 Tailwind CSS v4** - Utility-first CSS framework
- **🧪 Vitest** - Fast unit testing
- **📦 pnpm workspace** - Efficient package management
- **🏃 Turbo** - High-performance build system
- **� Security-first** - Following Electron best practices

## 🚀 Quick Start

```bash
# Clone or use template
git clone https://github.com/ccpu/electron-vite-tailwind-monorepo-template.git
cd electron-vite-tailwind-monorepo-template

# Initialize the template for your project (installs dependencies too)
pnpm run setup

# Start development
pnpm start

# Build for production
pnpm run compile
```

This is a one-time step. Until `pnpm run setup` has run, `pnpm install` prints a
reminder and `git commit` is blocked. Setup ends by deleting the `setup/` folder,
so the gate removes itself. It is skipped in CI, in this template repo itself, and
with `SKIP_SETUP_CHECK=1`.

## 📁 Project Structure

```
app/
├── main/             # Electron main process
└── windows/          # Multi-window system
    ├── main/         # Main application window
    └── settings/     # Settings window (example)

packages/             # Shared packages
├── electron-versions/
├── ui/              # UI components
└── utils/           # Utilities

tooling/             # Development tools
├── eslint/          # Lint configurations
├── prettier/        # Code formatting
├── typescript/      # TS configurations
├── vite/           # Vite configurations
└── vitest/         # Test configurations

buildResources/      # App icon: icon.svg is the source, the rest is generated
```

## 🪟 Multi-Window System

### Adding New Windows

```bash
# Create new window (interactive)
pnpm create-window

# Or specify name directly
pnpm create-window about
pnpm create-window settings
```

### Opening Windows

```typescript
// From any renderer process
await window.electronAPI.invoke('open-window', 'settings');
```

**Features:**

- 🔍 Automatic window detection
- � Isolated secure contexts
- 💾 State persistence (position/size)
- 🔥 Hot reload in development

## �️ Development

### Testing

```bash
pnpm test              # Unit tests with Vitest
pnpm run test:e2e      # E2E tests with Playwright
```

### App Icon

`buildResources/icon.svg` is the source the packaged icons come from. Replace it
with your own square artwork and re-render:

```bash
pnpm run gen:icons
```

That writes `icon.png` (1024px, Linux and the fallback everywhere else),
`icon.ico` (Windows) and `icon.icns` (macOS) next to it, which is where
electron-builder looks when it dresses the executable and the installer. Each
window also points its `browser-window-options.mjs` at `icon.png`, so the same
artwork shows on the window and in the taskbar, including on `pnpm start`.

Chromium does the rasterising, through the Playwright browser the E2E tests
already install (`npx playwright install chromium`).

### Environment Variables

```typescript
// Renderer (must be prefixed with VITE_)
const apiUrl = import.meta.env.VITE_API_URL;

// Main/Preload (any env var)
// eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
const dbUrl = process.env.DATABASE_URL;
```

### Dependencies

- **Renderer**: Any browser-compatible npm packages (React ecosystem, UI libraries)
- **Main/Preload**: Node.js APIs, native modules, file system operations

> ⚠️ **Security**: Never use Node.js APIs directly in renderer. Always expose through preload scripts.

## 📜 Available Scripts

```bash
# Development
pnpm start                    # Start development server
pnpm test                     # Run unit tests
pnpm run test:e2e            # Run E2E tests

# Building
pnpm run build               # Build all packages
pnpm run compile             # Build executable
pnpm run gen:icons           # Re-render app icons from buildResources/icon.svg

# Code Quality
pnpm run lint                # Check code quality
pnpm run format              # Format code
pnpm run typecheck           # Type checking

# Maintenance
pnpm run clean:workspaces    # Clean build outputs
pnpm run deps:update         # Update dependencies
```

## Acknowledgments

This template is based on the excellent work by [cawa-93](https://github.com/cawa-93) from the original [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) repository.

**Special thanks to:**

- [cawa-93](https://github.com/cawa-93) for the original secure Electron + Vite template
- The Electron team for security guidance and best practices
- The entire open-source community for the amazing tools

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
