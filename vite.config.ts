import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
  plugins: [react()],
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: "./vitest-setup.js",
  },
});

export default mergeConfig(viteConfig, vitestConfig);




// /// <reference types="vitest" />
// /// <reference types="vite/client" />
// /// <reference types="vitest/config" />

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   test: {
//     globals: true,
//     environment: "jsdom",
//   },
//   plugins: [react()], 
//   // test: {
//   //     globals: true,
//   //     environment: 'jsdom',
// //   //     setupFiles: ['@testing-library/jest-dom'],
// //   //     setupFiles: "./vitest-setup.js",
//   // },
// })
