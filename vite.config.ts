import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  build: {
    outDir: "dist", // 'dist' is the default value, can be omitted if you're okay with the default
  },
});
