import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, lowercase: true, trim: true },
		unit: { type: String, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbs: { type: Number, required: true },
		fat: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model("FoodItem", foodItemSchema);
