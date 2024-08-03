import prisma from "../lib/prisma.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description get all books information
 */
export async function getAllBooks(req, res) {
  let { page_count, limit } = req.query;

  if (limit > 20) {
    return res.status(401).json({
      success: false,
      message: "you can only request 20 records per page",
    });
  }

  // if no page_count and limit query is provided
  // default value for limit is 20
  // default value for page-count is 1

  if (!page_count || page_count <= 0) {
    page_count = 1;
  }
  if (!limit || limit <= 0) {
    limit = 20;
  }
  const skip = (page_count - 1) * limit;

  // check if provided query is valid
  if (isNaN(parseInt(limit)) || isNaN(parseInt(page_count))) {
    return res.status(400).json({ success: false, message: "bad request" });
  }

  try {
    const books = await prisma.book.findMany({
      take: parseInt(limit),
      skip: skip,
    });

    return res.status(201).json({ success: true, message: books });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}
