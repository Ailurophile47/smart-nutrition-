import express from "express";
import { addMeal, getMealsByDate, getDailyTotals } from "../controllers/mealController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { addMealSchema } from "../validators/mealValidator.js";

const router = express.Router();

router.get("/totals", getDailyTotals);
router.get("/", getMealsByDate);
router.post("/", validate(addMealSchema), addMeal);

export default router;
