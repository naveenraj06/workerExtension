import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'SMAC',
      remotes: {
        SMAC: {
          external: 'http://localhost:3000/remoteEntry.js', // URL to Webpack remote
          from: 'webpack', // Crucial: tell Vite the source is Webpack
          format: 'var'    // Most Webpack MF outputs use 'var' or 'window'
        }
      } as any,
      shared: ['react', 'react-dom'] // Must match shared libs in Webpack
    })

  ],
    build: {
    target: 'esnext' // Required for top-level await in federation
  }
})
