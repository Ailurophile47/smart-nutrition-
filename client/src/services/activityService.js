import api from "./api";

export async function listActivities() {
	const response = await api.get("/activities");
	return response.data;
}
