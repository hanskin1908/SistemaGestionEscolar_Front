import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'sistemagestionescolar'), // Ajustado a la carpeta que contiene index.html
  base: '/',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'sistemagestionescolar', 'index.html'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'sistemagestionescolar', 'src')
    }
  }
})
