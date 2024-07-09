import { defineConfig } from 'vite';
import zimpPlugin from './node_modules/zimp-framework/router.js';

export default defineConfig({
    server: {
        watch: {
          usePolling: true,
        },
    },
    plugins: [
        zimpPlugin()
    ]
});
