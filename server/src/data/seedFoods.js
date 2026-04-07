import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import FoodItem from "../models/FoodItem.js";
import { connectDB } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  await connectDB();

  const filePath = path.join(__dirname, "indianFoods.json");
  const foods = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  await FoodItem.deleteMany({});
  await FoodItem.insertMany(foods);

  // eslint-disable-next-line no-console
  console.log(`Seeded ${foods.length} foods`);
  process.exit(0);
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Seeding failed", error);
  process.exit(1);
});
