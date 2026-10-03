import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      allowedHosts: true as const,
      // HMR configuration with clientPort 443 for reverse-proxy compatibility
      hmr:
        process.env.DISABLE_HMR === 'true'
          ? false
          : {
              clientPort: 443,
            },
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              usePolling: true,
            },
    },
  };
});
