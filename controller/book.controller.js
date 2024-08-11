import prisma from "../lib/prisma.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description get all books information
 */
export async function getAllBooks(req, res) {
  let { page_count, limit, title, author, category } = req.query;

  // check if provided query is valid
  if (limit || page_count) {
    if (isNaN(parseInt(limit)) || isNaN(parseInt(page_count))) {
      return res.status(400).json({ success: false, message: "bad request" });
    }
  }

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

  try {
    // search by title
    if (title) {
      const searchByTitle = await prisma.book.findMany({
        where: {
          title: {
            contains: title.trim(),
            mode: "insensitive",
          },
        },
        take: parseInt(limit),
        skip,
      });
      return res.status(200).json({ success: true, message: searchByTitle });
    }

    // search by author name
    if (author) {
      const searchByAuthor = await prisma.book.findMany({
        where: {
          authors: {
            contains: author.trim(),
            mode: "insensitive",
          },
        },
        take: parseInt(limit),
        skip,
      });
      return res.status(200).json({ success: true, message: searchByAuthor });
    }

    // search by category
    if (category) {
      const books = await prisma.book.findMany({
        where: {
          categories: {
            contains: category.trim(),
            mode: "insensitive",
          },
        },
        take: parseInt(limit),
        skip,
      });
      return res.status(200).json({ success: true, message: books });
    }

    // search all books
    const books = await prisma.book.findMany({
      take: parseInt(limit),
      skip: skip,
    });

    return res.status(200).json({ success: true, message: books });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}
