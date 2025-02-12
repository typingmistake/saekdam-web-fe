/// <reference types="vite/client" />
import { defineConfig, loadEnv, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

interface ProxyConfig {
    [key: string]: ProxyOptions;
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const currentEnv = env.VITE_ENV || 'development';

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            proxy:
                currentEnv === 'development'
                    ? ({
                          '/api': {
                              target: 'http://localhost:8080',
                              changeOrigin: true,
                              rewrite: (path: string) => path.replace(/^\/api/, ''),
                          },
                      } as ProxyConfig)
                    : undefined,
        },
    };
});
