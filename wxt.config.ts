import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-solid'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: "Xen",
    description: "Vertical tab management that actually works",
    permissions: ['tabs', "sidePanel"],
  },
});
