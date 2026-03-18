import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

/* --Initial Load */
test('Initial load - should show first post', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('#post-title')).not.toBeEmpty();

  await expect(page.locator('#post-count')).toContainText('Post 1');

  await expect(page.locator('#prev-btn')).toBeDisabled();
});

/* --next prev button navigation---*/

test('prev and next navigation', async ({ page }) => {
  await page.goto(BASE_URL);
  const nextBtn = page.locator('#next-btn');
  const prevBtn = page.locator('#prev-btn');

  nextBtn.click();
  await expect(page.locator('#post-count')).toContainText('Post 2');
  prevBtn.click();
  await expect(page.locator('#post-count')).toContainText('Post 1');
});

/* ----Api Failure----*/

test('Error handling when API fails', async ({ page }) => {
  await page.route('**/posts/*', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' })
    });
  });

  await page.goto(BASE_URL);

  await expect(page.locator('#post-title')).toContainText('Error');
});

/* ---Refresh --- */
test('Refresh should reset to first post', async ({ page }) => {
  await page.goto(BASE_URL);

  const nextBtn = page.locator('#next-btn');
  const refreshBtn = page.locator('#refresh-btn');

  await nextBtn.click();
  await expect(page.locator('#post-count')).toContainText('Post 2');

  await refreshBtn.click();

  await expect(page.locator('#post-count')).toContainText('Post 1');
});
