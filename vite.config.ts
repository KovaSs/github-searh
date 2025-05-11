import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [svgr(), react()],
    build: {
      outDir: './build',
      emptyOutDir: true, // also necessary
    },
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
      __GITHUB_ACCESS_TOKEN__: JSON.stringify(env.VITE_GITHUB_ACCESS_TOKEN),
      __GITHUB_API_URL__: JSON.stringify(env.VITE_GITHUB_API_URL),
      __IS_DEV__: JSON.stringify(env.VITE_IS_DEV),
    },
  }
})
