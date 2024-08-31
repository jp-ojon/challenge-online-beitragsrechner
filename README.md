# Playwright Test Suite for UI Automation Tests of Digital Assistant "Online-Beitragsrechner"
## Overview
This test suite includes automated tests for the following:
- Functional Testing
- Test Case TC-001: Online-Beitragsrechner Test

## Author
Jon Paulo Ojon

## Prerequisites
* Node.js (v14 or later), find installer on https://nodejs.org/en/download/package-manager site
* Playwright

## Installation
1. Clone the repository and go to project directory
- git clone https://github.com/jp-ojon/challenge-online-beitragsrechner.git
- change directory to root folder challenge-online-beitragsrechner

2. Install the dependencies:
- npm install 
- npx playwright install

- Libraries used
- dotenv : to utilize the .env file for switching tests depending on the environment needed

## Test Cases
- Test Case TC-001: Online-Beitragsrechner Test

## Test Data
- The testDataFile.json under testdata folder should be populated using the correct values
- EmploymentStatus - should be based on the possible selections under Berufsstatus
- Income - should be a number without decimals
- InsuranceType - should be based on the possible selections under Versicherungswunsch
- InsuranceIngressDate - should be based on the possible selections on the dropdown list of Versicherungsstart. Format should be DD.MM.YYYY
- Birthday (Any) - Format should be DD.MM.YYYY

## Running Tests
Use the following commands in any terminal or cmd line to run tests in different browsers:
1. npm run test:development  : run all tests using the development environment
2. npm run test:production   : run all tests using the production environment

## Configuration
Configuration can be changed under playwright.config.ts
- headless                  : can either be true or false, false means browser would show up when tests are run
- timeout                   : Global timeout for all tests
- expect: timeout           : Timeout for expect() assertions

Under .env file
- URL of each environment, adjust accordingly.

## Recommendations
- **Resource Management:** Consider running tests in individual browsers to manage resources effectively and reduce flakiness.
- **Debugging:** If encountering issues, review logs and screenshots to diagnose problems. Adjust test cases if needed to handle browser-specific behaviors.

## Links to Documentation
- Playwright: https://playwright.dev/docs/intro