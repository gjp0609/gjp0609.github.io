import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    base: './',
    build: {
        outDir: 'docs',
        assetsDir: 'assets',
        emptyOutDir: false,
        chunkSizeWarningLimit: 1000
    },
    plugins: [vue()]
});
