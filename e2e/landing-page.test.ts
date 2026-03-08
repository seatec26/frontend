import { test, expect } from '@playwright/test';

test.describe('Landing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the landing page correctly', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveURL('/');

    // Check that the main heading is visible
    const heading = page.getByRole('heading', { name: 'Welcome to SoroSave' });
    await expect(heading).toBeVisible();

    // Check that the connect wallet button exists
    const connectButton = page.getByText('Connect Wallet');
    await expect(connectButton).toBeVisible();

    // Check that there are group cards visible
    const groupCards = page.getByTestId('group-card');
    await expect(groupCards).toHaveCount(1);
  });

  test('should navigate to the groups page', async ({ page }) => {
    const groupsLink = page.getByRole('link', { name: 'Groups' });
    await groupsLink.click();
    await expect(page).toHaveURL('/groups');
  });
});