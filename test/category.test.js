import express from "express";
import request from "supertest";
import prisma from "../lib/prisma.js";
import { categories } from "../controller/category.controller.js";
import { expect, it, jest } from "@jest/globals";
import {} from "jest-mock";

jest.mock("../lib/prisma.js");

const app = express();

app.get("/api/categories", categories);

describe("GET /api/categories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if limit is not a number", async () => {
    const response = await request(app)
      .get("/api/categories")
      .query({ limit: "abc" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ success: false, message: "bad request" });
  });

  it("should return 400 if page count is not a number", async () => {
    const response = await request(app)
      .get("/api/categories")
      .query({ page_count: "cde" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ success: false, message: "bad request" });
  });

  it("should return 401 if limit is greater than 20", async () => {
    const response = await request(app)
      .get("/api/categories")
      .query({ limit: 24 });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: "you can only request 20 records per page",
    });
  });

  it("should return categories with default pagination values", async () => {
    const mockCategories = [
      { category: "Fiction" },
      { category: "Non-Fiction" },
    ];

    prisma.category.findMany = jest.fn().mockResolvedValue(mockCategories);

    const response = await request(app).get("/api/categories");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: ["Fiction", "Non-Fiction"],
    });
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 20,
    });
  });

  it("should 200 with a number of page and number of limit", async () => {
    const mockCategories = [
      { category: "Adventure" },
      { category: "Science" },
      { category: "Literature" },
    ];

    prisma.category.findMany = jest.fn().mockResolvedValue(mockCategories);

    const response = await request(app)
      .get("/api/categories")
      .query({ page_count: 0, limit: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: ["Adventure", "Science", "Literature"],
    });
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 3,
    });
  });

  it("should return 500 if prisma throws an error", async () => {
    prisma.category.findMany = jest
      .fn()
      .mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/categories");
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      success: false,
      message: "internal server error",
    });
  });
});
