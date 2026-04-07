import FoodItem from "../models/FoodItem.js";

export async function listFoods(_req, res, next) {
	try {
		const foods = await FoodItem.find().sort({ name: 1 }).lean();
		return res.json(foods);
	} catch (error) {
		return next(error);
	}
}
