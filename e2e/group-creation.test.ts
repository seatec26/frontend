import { test, expect } from '@playwright/test';

test.describe('Group Creation Form Tests', () => {
  test('should validate group creation form', async ({ page }) => {
    await page.goto('/groups/new');

    // Try to submit form with empty fields
    const submitButton = page.getByRole('button', { name: 'Create Group' });
    await submitButton.click();

    // Should show validation errors
    await expect(page.getByText('Group Name is required')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
    await expect(page.getByText('Target Amount is required')).toBeVisible();
    await expect(page.getByText('Frequency is required')).toBeVisible();

    // Fill in valid data
    await page.getByLabel('Group Name').fill('Test Group');
    await page.getByLabel('Description').fill('Test Description');
    await page.getByLabel('Target Amount').fill('1000');
    await page.getByLabel('Frequency').selectOption('weekly');

    // Submit valid form
    await submitButton.click();

    // Should show success or redirect to new group page
    // Note: This would depend on actual implementation details
  });

  test('should display form field validation messages', async ({ page }) => {
    await page.goto('/groups/new');

    // Test validation for group name
    await page.getByLabel('Group Name').fill('');
    await page.getByRole('button', { name: 'Create Group' }).click();
    await expect(page.getByText('Group Name is required')).toBeVisible();
  });
});