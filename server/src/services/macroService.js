export function calculateMacros(items) {
	const totals = {
		calories: 0,
		protein: 0,
		carbs: 0,
		fat: 0,
	};

	for (const item of items) {
		totals.calories += item.food.calories * item.quantity;
		totals.protein += item.food.protein * item.quantity;
		totals.carbs += item.food.carbs * item.quantity;
		totals.fat += item.food.fat * item.quantity;
	}

	return {
		calories: Number(totals.calories.toFixed(2)),
		protein: Number(totals.protein.toFixed(2)),
		carbs: Number(totals.carbs.toFixed(2)),
		fat: Number(totals.fat.toFixed(2)),
	};
}
