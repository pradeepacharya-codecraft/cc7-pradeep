import { test, expect } from '@playwright/test';


/* ---------------- Initial Load ---------------- */
test('Initial load - should show first post', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#post-title')).not.toHaveText('Loading...');

  await expect(page.locator('#post-count')).toContainText('Post 1');
});

/* ------- Next / Prev Navigation ---------- */
test('Prev and next navigation', async ({ page }) => {
  await page.goto('/');

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

  await page.goto('/');

  await expect(page.locator('#post-title')).toContainText('Error');
});

/* -------Comment Fetch Failue------*/
test('Error handling when comments API fails', async ({ page }) => {
  await page.route('**/comments*', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Comments failed' })
    });
  });

  await page.goto('/');

  await expect(page.locator('#post-title')).not.toContainText('Error');

  await page.locator('#comment-btn').click();

  await expect(page.locator('#comments-section')).toContainText('Error');
});
/* ---------------- Refresh ---------------- */
test('Refresh should reset to first post', async ({ page }) => {
  await page.goto('/');

  const nextBtn = page.locator('#next-btn');
  const refreshBtn = page.locator('#refresh-btn');
  const postCount = page.locator('#post-count');

  await nextBtn.click();
  await expect(postCount).toContainText('Post 2');

  await refreshBtn.click();
  await expect(postCount).toContainText('Post 1');
});
