// test cases for the book controller

import express from "express";
import request from "supertest";
import prisma from "../lib/prisma.js";

import { getAllBooks } from "../controller/book.controller.js";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

import { bookMockData } from "../test/mockData.js";

jest.mock("../lib/prisma");

const app = express();

app.get("/api/books", getAllBooks);

describe("GET /api/books", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("it should return not a number if limit and page count is not a number", async () => {
    const response = await request(app)
      .get("/api/books")
      .query({ limit: "abc", page_count: "cde" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ success: false, message: "bad request" });
  });

  it("it should return to many request if limit count is greater than 20", async () => {
    const response = await request(app).get("/api/books").query({ limit: 21 });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ success: false, message: "bad request" });
  });

  it("should return default value for limit 20 and page count of 1 if no query is provided", async () => {
    prisma.book.findMany = jest.fn().mockResolvedValue(bookMockData);

    const response = await request(app).get("/api/books").query({});
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, message: bookMockData });
    expect(prisma.book.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 20,
    });
  });

  it("should return specified number of page count and limit if specified", async () => {
    prisma.book.findMany = jest.fn().mockResolvedValue(bookMockData);

    const response = await request(app).get("/api/books").query({
      page_count: 1,
      limit: 10,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, message: bookMockData });
    expect(prisma.book.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });
});
