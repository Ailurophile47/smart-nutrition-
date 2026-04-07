import api from "./api";

export async function login(payload) {
	const response = await api.post("/auth/login", payload);
	return response.data;
}
