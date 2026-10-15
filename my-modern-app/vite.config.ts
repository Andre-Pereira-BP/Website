import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The SSR bundle (dist-ssr/) is only used by scripts/prerender.mjs at build time
    copyPublicDir: !isSsrBuild,
  },
}))
