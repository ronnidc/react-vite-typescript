import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Manuel chunk-opdeling — adskiller store dependencies i egne filer
        // så browseren kan cache dem separat fra app-koden.
        // Termen: "manual chunks" / "vendor splitting"
        manualChunks: {
          // React core i én chunk
          'vendor-react': ['react', 'react-dom'],
          // Router i sin egen chunk
          'vendor-router': ['react-router-dom'],
          // TanStack Query i sin egen chunk
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
})
