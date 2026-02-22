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
    );
  });
});