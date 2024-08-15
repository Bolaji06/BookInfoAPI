import prisma from "../lib/prisma.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function categories(req, res) {
  let { page_count, limit } = req.query;

  // check if provided query is valid
  if (limit) {
    if (isNaN(parseInt(limit))) {
      return res.status(400).json({ success: false, message: "bad request" });
    }
  }
  if (page_count){
    if (isNaN(parseInt(page_count))){
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
    const categories = await prisma.category.findMany({
      skip: skip,
      take: parseInt(limit),
    });
    if (categories){
       const list = categories.map((item) => {
        if (item.category){
            return item.category
        }
       })
       return res.status(200).json({ success: true, categories: list }); 
    }
    //return res.status(200).json({ success: true, categories });
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
}
