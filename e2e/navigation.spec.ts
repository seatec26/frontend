import { test, expect } from '@playwright/test';

/**
 * Navigation E2E tests
 * Tests that navigation between pages works correctly.
 */
test.describe('Navigation', () => {
  test('should navigate from home to groups page via navbar link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Groups' }).first().click();
    await expect(page).toHaveURL('/groups');
    await expect(page.getByRole('heading', { name: 'Savings Groups' })).toBeVisible();
  });

  test('should navigate from home to create group page via navbar link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Create Group' }).click();
    await expect(page).toHaveURL('/groups/new');
    await expect(
      page.getByRole('heading', { name: 'Create a Savings Group' })
    ).toBeVisible();
  });

  test('should navigate to groups page via "Browse Groups" hero CTA', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Browse Groups' }).click();
    await expect(page).toHaveURL('/groups');
  });

  test('should navigate to new group page via "Create a Group" hero CTA', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Create a Group' }).click();
    await expect(page).toHaveURL('/groups/new');
  });

  test('should navigate back to home by clicking brand logo', async ({ page }) => {
    await page.goto('/groups');
    await page.getByRole('link', { name: 'SoroSave' }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to groups page via direct URL', async ({ page }) => {
    await page.goto('/groups');
    await expect(page).toHaveURL('/groups');
    await expect(page.getByRole('heading', { name: 'Savings Groups' })).toBeVisible();
  });

  test('should navigate to create group page via direct URL', async ({ page }) => {
    await page.goto('/groups/new');
    await expect(page).toHaveURL('/groups/new');
    await expect(
      page.getByRole('heading', { name: 'Create a Savings Group' })
    ).toBeVisible();
  });

  test('should render navbar on groups page', async ({ page }) => {
    await page.goto('/groups');
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText('SoroSave')).toBeVisible();
  });

  test('should render navbar on create group page', async ({ page }) => {
    await page.goto('/groups/new');
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText('SoroSave')).toBeVisible();
  });
});
