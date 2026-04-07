export function sumMacros(items) {
	return items.reduce(
		(acc, item) => {
			acc.calories += item.calories || 0;
			acc.protein += item.protein || 0;
			acc.carbs += item.carbs || 0;
			acc.fat += item.fat || 0;
			return acc;
		},
		{ calories: 0, protein: 0, carbs: 0, fat: 0 }
	);
}
