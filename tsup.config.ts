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
    esbuildOptions: (options) => {
      options.footer = {
        // fix CJS, need use require(xxx).default
        // https://github.com/egoist/tsup/issues/572
        js: 'module.exports = module.exports.default;',
      };
    },
  };
});
