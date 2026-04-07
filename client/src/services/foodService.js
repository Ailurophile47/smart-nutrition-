import api from "./api";

export async function listFoods() {
	const response = await api.get("/foods");
	return response.data;
}
