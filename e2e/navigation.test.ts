import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate between pages', async ({ page }) => {
    // Navigate to groups page
    await page.goto('/groups');
    await expect(page).toHaveURL('/groups');

    // Navigate to new group page
    await page.getByRole('link', { name: 'Create New Group' }).click();
    await expect(page).toHaveURL('/groups/new');

    // Go back to groups page
    await page.goBack();
    await expect(page).toHaveURL('/groups');

    // Back to home page
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });
});