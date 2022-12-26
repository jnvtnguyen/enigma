import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

type ViteConfigInput = {
  mode: string;
  command: string;
};

export default (args: ViteConfigInput) => {
  const generateScopedName =
    args.mode == 'development' ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:10]';
  return defineConfig({
    plugins: [react(), tsConfigPaths()],
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: false,
          secure: false,
          ws: true
        }
      }
    },
    css: {
      modules: {
        generateScopedName: generateScopedName
      }
    }
  });
};
