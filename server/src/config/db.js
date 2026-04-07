import mongoose from "mongoose";
import env from "./env.js";

export async function connectDB() {
	if (!env.MONGO_URI) {
		throw new Error("MONGO_URI is missing in server/.env");
	}

	await mongoose.connect(env.MONGO_URI);
	// eslint-disable-next-line no-console
	console.log("MongoDB connected");
}
