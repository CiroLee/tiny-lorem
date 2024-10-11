import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => {
  return {
    entry: ['src/index.ts'],
    outDir: 'lib',
    format: ['esm', 'cjs'],
    dts: true,
    minify: !options.watch,
    sourcemap: options.sourcemap,
    watch: options.watch,
    clean: true,
  };
});
