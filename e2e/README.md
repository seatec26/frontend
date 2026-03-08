# SoroSave Frontend E2E Tests

End-to-end tests for the SoroSave frontend using [Playwright](https://playwright.dev/).

## Test Structure

```
e2e/
├── landing.spec.ts       # Landing page rendering tests
├── navigation.spec.ts    # Page navigation tests
├── create-group.spec.ts  # Group creation form validation tests
├── wallet.spec.ts        # Wallet connection mock tests
└── README.md             # This file
```

## Running Tests

First, install Playwright browsers:

```bash
npx playwright install
```

### Run all E2E tests (headless)

```bash
npm run test:e2e
```

### Run tests with UI mode

```bash
npm run test:e2e:ui
```

### View HTML test report

```bash
npm run test:e2e:report
```

### Run a specific test file

```bash
npx playwright test e2e/landing.spec.ts
```

### Run tests against a specific browser

```bash
npx playwright test --project=chromium
```

## Test Categories

### Landing Page (`landing.spec.ts`)

- Page title matches "SoroSave"
- Navbar renders with brand name and navigation links
- Hero section renders with heading, description, and CTA buttons
- "How It Works" section with all 4 steps
- "Why SoroSave?" features section (Trustless, Transparent, Low Cost)
- Footer with links

### Navigation (`navigation.spec.ts`)

- Navigate to groups page via navbar link
- Navigate to create group page via navbar link
- Navigate via hero CTA buttons
- Navigate back to home via brand logo
- Direct URL navigation to all pages
- Navbar renders on all pages

### Group Creation Form (`create-group.spec.ts`)

- Shows connect wallet prompt when unauthenticated
- Hides form when wallet is not connected
- Form validation for required fields (with mocked wallet)
- Groups list page displays placeholder groups

### Wallet Connection (`wallet.spec.ts`)

- ConnectWallet button renders in navbar
- Connect button text visible when not connected
- Freighter extension mock integration
- Wallet-gated pages show correct prompts

## Mocking Wallet Connection

Since these are E2E tests, we mock the Freighter wallet browser extension using
`page.addInitScript()` to inject a mock wallet object into the browser window
before page scripts run.

The mock simulates:
- `isConnected()` returning `true`
- `getPublicKey()` returning a test Stellar address
- `signTransaction()` returning the input XDR unchanged

```typescript
await page.addInitScript((address: string) => {
  Object.defineProperty(window, 'freighter', {
    value: {
      getPublicKey: async () => address,
      isConnected: async () => ({ isConnected: true }),
      signTransaction: async (xdr: string) => ({ signedTxXdr: xdr }),
    },
    writable: true,
  });
}, MOCK_ADDRESS);
```

## CI Integration

Tests run on CI using the `github` reporter. The `playwright.config.ts` is
configured to:
- Retry failed tests twice on CI
- Run tests sequentially on CI (`workers: 1`)
- Start the Next.js dev server automatically before tests
