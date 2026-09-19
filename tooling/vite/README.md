# @internal/vite

Shared Vite configuration for the Electron renderer and preload processes.

## `@internal/vite/renderer`

```ts
import renderer from '@internal/vite/renderer';

export default renderer();
```

Bundles `@vitejs/plugin-react`, `@tailwindcss/vite` and
[`@pixpilot/vite-plugin-source-inspector`](https://www.npmjs.com/package/@pixpilot/vite-plugin-source-inspector)
on top of `electron-vite-toolkit`'s renderer config.

### Source inspector

Dev-server only — it is skipped for `vite build`. Toggle **Inspect source** in the
running window, or hold <kbd>Alt</kbd> + <kbd>Shift</kbd>, then click an element to
open its `.tsx` source in your editor. Set `SOURCE_INSPECTOR_EDITOR` (or `EDITOR`) to
override the default `code` command.

Only files under the renderer's own `src` directory are instrumented; components
imported from workspace packages such as `@internal/ui` live outside the Vite root and
are not covered.

Pass options through, or opt out entirely:

```ts
export default renderer({
  sourceInspector: { editor: 'cursor', toggleButton: { position: 'top-right' } },
});

export default renderer({ sourceInspector: false });
```

## `@internal/vite/preload`

Preload-process config from `electron-vite-toolkit`.
