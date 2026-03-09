<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService - getRandomDogImage (positive)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return imageUrl and success status', async () => {
    const mockedResponse = {
      message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success'
    };

    const fetchMock = vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => mockedResponse
    } as any);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedResponse.message);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});


describe('dogService - getRandomDogImage (negative)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw error when API response is not ok', async () => {
    vi.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: false,
      status: 500
    } as any);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
=======
import { describe, it, expect, vi, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("getRandomDogImage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return dog image when API call succeeds", async () => {
    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      status: "success"
    };

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    } as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe("success");
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("should throw an error when API response is not ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500
    } as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image: Dog API returned status 500"
>>>>>>> 259641b (Fix route tests to mock controller instead of service)
    );
  });
});