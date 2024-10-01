import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    blockHosts: ["https://events.backtrace.io"],
  },
})