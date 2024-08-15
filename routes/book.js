
import express from "express";
import { getAllBooks, getBook } from "../controller/book.controller.js";


const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBook);

export default router;