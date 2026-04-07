import express from "express";
import cors from "cors";
import mealRoutes from "./routes/mealRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
	res.send("API running");
});

app.use("/api/meals", mealRoutes);
app.use("/api/foods", foodRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
