import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const REPO_NAME = 'CodeSangam-2026-project'

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    viteReact(),
  ],
  server: {
    port: 3000,
  },
})
