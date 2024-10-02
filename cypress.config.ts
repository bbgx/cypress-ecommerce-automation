import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  env: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    blockHosts: [
      "backtrace.io",
      "*backtrace.io",
      "*.backtrace.io",
      "google-analytics.com",
      "*google-analytics.com",
      "*.google-analytics.com",
      "*sentry.io",
      "*.sentry.io",
    ],
  },
});