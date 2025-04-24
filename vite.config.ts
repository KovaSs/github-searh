import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
      __GITHUB_ACCESS_TOKEN__: JSON.stringify(env.VITE_GITHUB_ACCESS_TOKEN),
      __IS_DEV__: JSON.stringify(env.VITE_IS_DEV),
    },
  }
})
