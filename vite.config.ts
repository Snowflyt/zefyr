import path from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import EsLint from 'vite-plugin-linter';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    tsConfigPaths(),
    EsLint.linterPlugin({
      include: ['src/**/*.{ts,tsx}'],
      linters: [new EsLint.EsLinter({ configEnv })],
    }),
    dts({
      include: ['src/'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve('src', 'index.min.ts'),
      name: 'zefyr',
      formats: ['es', 'umd'],
      fileName: (format) =>
        format === 'es' ? 'index.min.js' : `index.${format}.min.js`,
    },
  },
}));
