<<<<<<< HEAD
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

describe("dogController - getDogImage (positive)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return success true and mocked dog data", async () => {
    const mockedDogData = {
      imageUrl: "https://images.dog.ceo/test.jpg",
      status: "success",
    };

    // Mock the service
    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockedDogData);

    // Mock response object
    const jsonMock = vi.fn();
    const statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    const res = {
      json: jsonMock,
      status: statusMock,
    } as any;

    await getDogImage({} as any, res);

    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: mockedDogData,
=======
import { describe, it, expect, vi, afterEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

vi.mock("../services/dogService", () => ({
  getRandomDogImage: vi.fn()
}));

describe("getDogImage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return success true and mocked dog data", async () => {
    const mockDogData = {
      imageUrl: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      status: "success"
    };

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogData);

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
>>>>>>> 259641b (Fix route tests to mock controller instead of service)
    });
  });
});