
import express from "express";
import { categories } from "../controller/category.controller.js";

const router = express.Router();

router.get('/', categories);

export default router;