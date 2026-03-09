import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

import react from "@vitejs/plugin-react-swc";
import {crx } from "@crxjs/vite-plugin";


import manifestJson from "./manifest.json";

const manifest:any = manifestJson;

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), crx({ manifest }), tailwindcss()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        sidepanel: './src/sidepanel/index.html',
      }
    }
  }
})
