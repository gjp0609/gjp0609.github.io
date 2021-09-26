import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command }) => {
    let same = {
        base: './',
        envDir: './.env',
        plugins: [vue()]
    };
    let diff;
    if (command === 'build') {
        diff = {
            build: {
                outDir: 'docs',
                assetsDir: 'assets',
                emptyOutDir: false,
                chunkSizeWarningLimit: 1000
            }
        };
    } else {
        diff = {
            server: {
                port: 32000
            }
        };
    }
    return Object.assign(same, diff);
});
