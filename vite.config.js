import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        outDir: 'docs',
        emptyOutDir: false,
        chunkSizeWarningLimit: 1000
    },
    plugins: [vue()]
});
