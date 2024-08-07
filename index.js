import { PrismaClient } from "@prisma/client";
import express from "express";
import fs from "fs";
//import file from '../BookInfoAPI/export.json'

import prisma from "./lib/prisma.js";

import book from "./routes/book.js";
import category from "./routes/category.js"

const app = express();

app.use("/api/books", book);
app.use("/api/categories", category)

async function loadData() {
  try {
    const data = JSON.parse(
      fs.readFileSync("../BookInfoAPI/export.json", "utf-8")
    );

    for (let item of data) {
      // Ensure item.categories is an array
      if (Array.isArray(item.categories)) {
        for (let category of item.categories) {
          const ignoreCasing = category.toLowerCase();
          await prisma.category.upsert({
            where: { category: category },
            update: {},
            create: { category: category },
          });
        }
      } else if (typeof item.categories === "string") {
        //const ignoreCasing = item.categories.toLowerCase();
        await prisma.category.upsert({
          where: { category: item.categories },
          update: {},
          create: { category: item.categories },
        });
      }
    }
    console.log("Data loaded successfully");
  } catch (err) {
    console.log(err);
  }
  console.log("Syncing data...");
}

//loadData()

app.listen(3000, () => {
  console.log("Server starting at 3000");
});
