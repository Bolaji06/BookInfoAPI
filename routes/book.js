
import express from "express";


const router = express.Router();

router.use('/books', getAllBooks);