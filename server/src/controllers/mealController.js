import mongoose from "mongoose";
import FoodItem from "../models/FoodItem.js";
import MealLog from "../models/MealLog.js";
import { calculateMacros } from "../services/macroService.js";

function dayRange(dateParam) {
	const base = dateParam ? new Date(dateParam) : new Date();
	const start = new Date(base);
	start.setHours(0, 0, 0, 0);
	const end = new Date(base);
	end.setHours(23, 59, 59, 999);
	return { start, end };
}

export async function addMeal(req, res, next) {
	try {
		const { mealType, items, userId } = req.body;
		const resolvedItems = [];

		for (const item of items) {
			if (!mongoose.Types.ObjectId.isValid(item.foodId)) {
				return res.status(400).json({ success: false, message: `Invalid foodId: ${item.foodId}` });
			}

			const food = await FoodItem.findById(item.foodId).lean();
			if (!food) {
				return res.status(404).json({ success: false, message: `Food not found: ${item.foodId}` });
			}

			resolvedItems.push({ food, quantity: item.quantity, foodId: item.foodId });
		}

		const totals = calculateMacros(resolvedItems);

		const meal = await MealLog.create({
			userId,
			mealType,
			items: resolvedItems.map((it) => ({ food: it.foodId, quantity: it.quantity })),
			totals,
		});

		const populated = await meal.populate("items.food");
		return res.status(201).json({ success: true, data: populated });
	} catch (error) {
		return next(error);
	}
}

export async function getMealsByDate(req, res, next) {
	try {
		const { date } = req.query;
		const { start, end } = dayRange(date);

		const meals = await MealLog.find({ date: { $gte: start, $lte: end } })
			.populate("items.food")
			.sort({ date: -1 })
			.lean();

		return res.json({ success: true, data: meals });
	} catch (error) {
		return next(error);
	}
}

export async function getDailyTotals(req, res, next) {
	try {
		const { date } = req.query;
		const { start, end } = dayRange(date);

		const meals = await MealLog.find({ date: { $gte: start, $lte: end } }).lean();

		const totals = meals.reduce(
			(acc, meal) => {
				acc.calories += meal.totals.calories;
				acc.protein += meal.totals.protein;
				acc.carbs += meal.totals.carbs;
				acc.fat += meal.totals.fat;
				return acc;
			},
			{ calories: 0, protein: 0, carbs: 0, fat: 0 }
		);

		return res.json({
			success: true,
			data: {
				calories: Number(totals.calories.toFixed(2)),
				protein: Number(totals.protein.toFixed(2)),
				carbs: Number(totals.carbs.toFixed(2)),
				fat: Number(totals.fat.toFixed(2)),
			},
		});
	} catch (error) {
		return next(error);
	}
}
