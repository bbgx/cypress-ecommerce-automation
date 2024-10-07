# 🌟 Cypress E-commerce Automation

![Cypress](https://img.shields.io/badge/Cypress-v9.6.0-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v20.17.0-blue)
![License](https://img.shields.io/badge/license-WTFPL-brightgreen)
[![Cypress Tests with Allure Report](https://github.com/bbgx/cypress-ecommerce-automation/actions/workflows/run.yml/badge.svg)](https://github.com/bbgx/cypress-ecommerce-automation/actions/workflows/run.yml)

## 📖 Description
Cypress E-commerce Automation is a robust testing framework designed for automating end-to-end tests of the Sauce Labs e-commerce demo application (Swag Labs). This repository encompasses a collection of tests that ensure the application’s functionality and performance.

## 📋 Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Generating Allure Reports](#generating-allure-reports)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features
- **End-to-End Testing**: Comprehensive tests for e-commerce functionalities.
- **Automated Test Execution**: Leverage Cypress for seamless testing.
- **Allure Reporting**: Detailed and beautiful test reports.
- **CI/CD Integration**: Automatically runs tests with GitHub Actions.

## 🛠 Technologies
- [Cypress](https://www.cypress.io/) - A powerful JavaScript end-to-end testing framework.
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Allure](https://docs.qameta.io/allure/) - Flexible reporting tool for test results.
- [pnpm](https://pnpm.js.org/) - Fast, disk space-efficient package manager.

## 📥 Installation
1. Clone the repository:
  ```bash
  └─$ git clone https://github.com/bbgx/cypress-ecommerce-automation.git
  └─$ cd cypress-ecommerce-automation
  ```
2. Install dependencies:
  ```bash
  └─$ pnpm install
   ```

## 🏃 Running Tests
To run the tests, execute the following command:
  ```bash
  └─$ pnpm cy:run
  ```
To open the Cypress Test Runner, use:
  ```bash
  └─$ pnpm cy:open
  ```

## 📊 Generating Allure Reports
Generate Allure reports after executing tests:
  ```bash
  └─$ pnpm allure:report
  ```
This will create an Allure report in the allure-report directory.

## 🌐 Deployment
Allure reports are automatically deployed to GitHub Pages on each push to the master branch using GitHub Actions. Access the reports [**HERE**](https://bbgx.github.io/cypress-ecommerce-automation/)

## 🤝 Contributing
No need to contribute. I'm using this repository just to study more about [**App Actions**](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)

## 📄 License
This project is licensed under the [WTFPL License](http://www.wtfpl.net/). See the `LICENSE` file for more information.