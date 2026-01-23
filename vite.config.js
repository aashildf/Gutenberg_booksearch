import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Gutenberg_booksearch/",
  //  Bruker :build.rollupOptions.output.manualChunkskoden, slik at biblioteker/ (node_modules) havner i  egen fil, og egen kode havner i en annen. Dette er bedre for ytelsen.
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
