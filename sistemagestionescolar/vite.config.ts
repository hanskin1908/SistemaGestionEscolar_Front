import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'sistemagestionescolar'),
  base: '/',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['react-router-dom'],
      input: path.resolve(__dirname, 'sistemagestionescolar', 'index.html'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'sistemagestionescolar', 'src')
    }
  }
})
