import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        musicLibrary: "http://localhost:5001/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["utils/**", "src/main.tsx", "vite.config.ts", "src/vite-env.d.ts", "src/setupTests.ts", "src/index.tsx", "src/types/**", "eslint.config.js"]
    }
  },
  build: {
    target: "esnext"
  }
})
