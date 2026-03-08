# End-to-End Tests

This directory contains Playwright end-to-end tests for the SoroSave frontend.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Run tests:
   ```bash
   npx playwright test
   ```

## Test Structure

- **landing-page.test.ts**: Tests for the landing page rendering and navigation
- **navigation.test.ts**: Tests for page navigation between different routes
- **group-creation.test.ts**: Tests for group creation form validation
- **wallet.test.ts**: Tests for wallet connection mock scenarios

## Available Commands

- `npx playwright test` - Run all tests
- `npx playwright test --headed` - Run tests with browser UI
- `npx playwright test --grep "Landing Page Tests"` - Run specific tests
- `npx playwright open` - Open Playwright Test Runner UI
