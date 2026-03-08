import { test, expect } from '@playwright/test';
import { vi } from 'vitest';

test.describe('Wallet Connection Tests', () => {
  test.use({
    // Mock wallet connection
    storageState: {
      origins: [{
        origin: 'http://localhost:3000',
        localStorage: [
          {
            name: 'connectedWallet',
            value: '{"address":"GBXQ2FJ2Z7D2JZ7W2JWUQJ4K6M6Y6JYJ5X2F4Z2K6X2Y2Q2F6Z2J2"}'
          }
        ]
      }]
    }
  });

  test('should render connected wallet state when mocked', async ({ page }) => {
    await page.goto('/');

    // Should see wallet connected UI elements
    const connectedIndicator = page.getByText('Connected');
    await expect(connectedIndicator).toBeVisible();
  });

  test('should handle wallet disconnection', async ({ page }) => {
    await page.goto('/');

    // Simulate wallet disconnection by clearing local storage
    await page.evaluate(() => {
      localStorage.removeItem('connectedWallet');
    });

    // Should update UI to show disconnected state
    const disconnectedIndicator = page.getByText('Disconnected');
    await expect(disconnectedIndicator).toBeVisible();
  });
});