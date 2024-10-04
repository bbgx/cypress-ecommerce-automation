import { defineConfig } from 'cypress';
import { allureCypress } from "allure-cypress/reporter";
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  env: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    allure: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
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