import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import dogRoutes from "../routes/dogRoutes";
import * as dogController from "../controllers/dogController";

vi.mock("../controllers/dogController");

describe("dogRoutes", () => {
  const app = express();

  app.use("/api/dogs", dogRoutes);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 200 and success true for /api/dogs/random", async () => {
    vi.mocked(dogController.getDogImage).mockImplementation(async (_req: any, res: any) => {
      res.json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/test.jpg",
          status: "success"
        }
      });
    });

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return 500 and error message", async () => {
    vi.mocked(dogController.getDogImage).mockImplementation(async (_req: any, res: any) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error"
      });
    });

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});