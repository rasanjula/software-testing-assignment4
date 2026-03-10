import { test, expect } from '@playwright/test';

// /*
//   Test 3
//   Positive E2E test.

// */
test('dog image is loaded successfully when page loads', async ({ page }) => {

  // Open the application
  await page.goto('http://localhost:5173');

  // Wait for the API response to finish
  await page.waitForResponse(
    response =>
      response.url().includes('/api/dogs/random') &&
      response.status() === 200
  );

  // Locate the image element
  const image = page.locator('img');

  // Verify image is visible
  await expect(image).toBeVisible();

  // Verify image source starts with https://
  await expect(image).toHaveAttribute('src', /^https:\/\//);
});


// /*
//   Test 4
//   Positive E2E test.

// */
test('dog image is loaded successfully when button is clicked', async ({ page }) => {

  // Open the application
  await page.goto('http://localhost:5173');

  // Find the button that loads a dog image
  const button = page.getByRole('button', { name: /dog/i });

  // Wait for the API response after clicking
  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/dogs/random') &&
      response.status() === 200
  );

  // Click the button
  await button.click();

  // Wait for the API response to complete
  await responsePromise;

  // Locate the image element
  const image = page.locator('img');

  // Verify image is visible
  await expect(image).toBeVisible();

  // Verify image source starts with https://
  await expect(image).toHaveAttribute('src', /^https:\/\//);
});


// /*
//   Test 5
//   Negative E2E test.

// */
test('error message is shown when API call fails', async ({ page }) => {

  // Abort the API request
  await page.route('**/api/dogs/random', async route => {
    await route.abort();
  });

  // Open the application
  await page.goto('http://localhost:5173');

  // Verify that an element containing the word "error" is visible
  const errorElement = page.getByText(/error/i);
  await expect(errorElement).toBeVisible();

});