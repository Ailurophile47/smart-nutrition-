export function buildWeeklySummary(meals) {
	return {
		totalMeals: meals.length,
		totalCalories: meals.reduce((sum, meal) => sum + (meal.totals?.calories || 0), 0),
	};
}
