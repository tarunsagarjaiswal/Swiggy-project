import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever your React app asks for something starting with /dapi...
      '/dapi': {
        target: 'https://www.swiggy.com', // ...Vite will secretly forward it to Swiggy
        changeOrigin: true, // This bypasses the CORS check
        headers: {
          // Sometimes Swiggy blocks requests that don't look like real browsers
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        }
      }
    }
  }
})