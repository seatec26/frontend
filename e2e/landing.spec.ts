import { test, expect } from '@playwright/test';

/**
 * Landing page E2E tests
 * Tests that the home page renders correctly with all key sections and content.
 */
test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/SoroSave/);
  });

  test('should render the navbar with brand name', async ({ page }) => {
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    await expect(navbar.getByText('SoroSave')).toBeVisible();
  });

  test('should render navigation links in navbar', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Groups' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Group' })).toBeVisible();
  });

  test('should render the hero section with heading', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: /Decentralized Group Savings for Everyone/i,
    });
    await expect(heading).toBeVisible();
  });

  test('should render the hero description text', async ({ page }) => {
    await expect(
      page.getByText(/SoroSave brings the traditional rotating savings model/i)
    ).toBeVisible();
  });

  test('should render "Browse Groups" CTA button', async ({ page }) => {
    const browseLink = page.getByRole('link', { name: 'Browse Groups' });
    await expect(browseLink).toBeVisible();
    await expect(browseLink).toHaveAttribute('href', '/groups');
  });

  test('should render "Create a Group" CTA button', async ({ page }) => {
    const createLink = page.getByRole('link', { name: 'Create a Group' });
    await expect(createLink).toBeVisible();
    await expect(createLink).toHaveAttribute('href', '/groups/new');
  });

  test('should render the "How It Works" section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'How It Works' })
    ).toBeVisible();
  });

  test('should render all four "How It Works" steps', async ({ page }) => {
    const steps = [
      'Create a Group',
      'Members Join',
      'Contribute Each Cycle',
      'Receive the Pot',
    ];
    for (const step of steps) {
      await expect(page.getByText(step)).toBeVisible();
    }
  });

  test('should render the "Why SoroSave?" features section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Why SoroSave?' })
    ).toBeVisible();
    await expect(page.getByText('Trustless')).toBeVisible();
    await expect(page.getByText('Transparent')).toBeVisible();
    await expect(page.getByText('Low Cost')).toBeVisible();
  });

  test('should render the footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('SoroSave')).toBeVisible();
    await expect(
      footer.getByText(/Open-source decentralized group savings/i)
    ).toBeVisible();
  });

  test('should render footer links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Discord' })).toBeVisible();
  });
});
