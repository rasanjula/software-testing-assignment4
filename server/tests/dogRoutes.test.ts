import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import router from "../routes/dogRoutes";
import * as dogService from "../services/dogService";

describe("dogRoutes", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 200 and success true with mocked image", async () => {
    const mockedDogData = {
      imageUrl: "https://images.dog.ceo/test.jpg",
      status: "success",
    };

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockedDogData);

    const app = express();
    app.use("/api/dogs", router);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain("test.jpg");
  });

  it("should return 500 and error message", async () => {
    vi.spyOn(dogService, "getRandomDogImage").mockRejectedValue(
      new Error("Network error"),
    );

    const app = express();
    app.use("/api/dogs", router);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Network error");
  });
});