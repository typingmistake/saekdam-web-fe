/// <reference types="vite/client" />
import { defineConfig, UserConfigExport, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

interface ProxyConfig {
    [key: string]: ProxyOptions;
}

const env: string = import.meta.env.VITE_ENV || 'development';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy:
            env === 'development'
                ? ({
                      '/api': {
                          target: 'http://localhost:8080',
                          changeOrigin: true,
                          rewrite: (path: string) => path.replace(/^\/api/, ''),
                      },
                  } as ProxyConfig)
                : undefined,
    },
} as UserConfigExport);
