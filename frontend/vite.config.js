// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//       '/api':'http://localhost:8080',
//     },
//   },
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/event-service': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
