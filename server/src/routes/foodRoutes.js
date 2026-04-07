import express from "express";
import { listFoods } from "../controllers/foodController.js";

const router = express.Router();

router.get("/", listFoods);

export default router;
