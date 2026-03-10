import { test, expect } from '@playwright/test';

// Test 1 – Positive API test
// Calls /api/dogs/random and verifies that the API returns a successful
// response with HTTP status 200 and valid dog image data.

test('positive API test: GET /api/dogs/random returns dog image data', async ({ request }) => {
  const response = await request.get('http://localhost:5000/api/dogs/random');
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.success).toBe(true);
  expect(body.data).toBeTruthy();
  expect(body.data.imageUrl).toBeTruthy();
  expect(typeof body.data.imageUrl).toBe('string');
});


// Test 2 – Negative API test
// Calls an invalid endpoint (/api/dogs/invalid) and verifies that
// the server returns HTTP 404 and the correct error message.

test('negative API test: invalid route returns 404 and correct error message', async ({ request }) => {
  const response = await request.get('http://localhost:5000/api/dogs/invalid');
  const body = await response.json();

  expect(response.status()).toBe(404);
  expect(body.error).toBeTruthy();
  expect(body.error).toBe('Route not found');
});