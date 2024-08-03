import { PrismaClient } from "@prisma/client";
import express from "express";
import fs from "fs";
//import file from '../BookInfoAPI/export.json'

const app = express();

const prisma = new PrismaClient();

async function loadData() {
  try {
    const data = JSON.parse(
      fs.readFileSync("../BookInfoAPI/export.json", "utf-8")
    );

    for (let item of data) {
      await prisma.book.create({
        data: item,
      });
    }
    console.log("Data loaded successfully");
  } catch (err) {
    console.log(err);
  }
}
//loadData();

app.listen(3000, () => {
  console.log("Server starting at 3000");
});
