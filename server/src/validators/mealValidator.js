import { z } from "zod";

export const addMealSchema = z.object({
	mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
	userId: z.string().optional(),
	items: z
		.array(
			z.object({
				foodId: z.string().min(1),
				quantity: z.number().positive(),
			})
		)
		.min(1),
});
