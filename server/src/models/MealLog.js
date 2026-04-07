import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema(
	{
		food: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
		quantity: { type: Number, required: true, min: 0.1 },
	},
	{ _id: false }
);

const totalsSchema = new mongoose.Schema(
	{
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbs: { type: Number, required: true },
		fat: { type: Number, required: true },
	},
	{ _id: false }
);

const mealLogSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		mealType: {
			type: String,
			required: true,
			enum: ["breakfast", "lunch", "dinner", "snack"],
		},
		items: { type: [mealItemSchema], required: true, validate: (v) => v.length > 0 },
		totals: { type: totalsSchema, required: true },
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

export default mongoose.model("MealLog", mealLogSchema);
