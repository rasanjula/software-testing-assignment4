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
    });
  });
});