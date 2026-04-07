import api from "./api";

export async function addMeal(payload) {
	const response = await api.post("/meals", payload);
	return response.data;
}

export async function getMealsByDate(date) {
	const response = await api.get("/meals", { params: { date } });
	return response.data;
}

export async function getDailyTotals(date) {
	const response = await api.get("/meals/totals", { params: { date } });
	return response.data;
}
