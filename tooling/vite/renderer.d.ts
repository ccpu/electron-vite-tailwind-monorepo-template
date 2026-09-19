import type { SourceInspectorOptions } from '@pixpilot/vite-plugin-source-inspector';
import type { UserConfig } from 'vite';

export interface RendererViteConfigOptions extends UserConfig {
  /**
   * Options for the dev-only source inspector, or `false` to disable it.
   */
  sourceInspector?: SourceInspectorOptions | false;
}

declare function createRendererViteConfig(
  options?: RendererViteConfigOptions,
): UserConfig;

export default createRendererViteConfig;
