import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

/* ---------------- Initial Load ---------------- */
test('Initial load - should show first post', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page.locator('#post-title')).not.toHaveText('Loading...');

  await expect(page.locator('#post-count')).toContainText('Post 1');
});

/* ------- Next / Prev Navigation ---------- */
test('Prev and next navigation', async ({ page }) => {
  await page.goto(BASE_URL);

  const nextBtn = page.locator('#next-btn');
  const prevBtn = page.locator('#prev-btn');
  const postCount = page.locator('#post-count');

  await nextBtn.click();
  await expect(postCount).toContainText('Post 2');

  await prevBtn.click();
  await expect(postCount).toContainText('Post 1');
});

/* ---------------- API Failure ---------------- */
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

/* ---------------- Refresh ---------------- */
test('Refresh should reset to first post', async ({ page }) => {
  await page.goto(BASE_URL);

  const nextBtn = page.locator('#next-btn');
  const refreshBtn = page.locator('#refresh-btn');
  const postCount = page.locator('#post-count');

  await nextBtn.click();
  await expect(postCount).toContainText('Post 2');

  await refreshBtn.click();
  await expect(postCount).toContainText('Post 1');
});
