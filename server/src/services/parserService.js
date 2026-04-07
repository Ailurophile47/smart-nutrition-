export function parseMealText(input) {
	if (!input || typeof input !== "string") {
		return [];
	}

	return input
		.split("+")
		.map((chunk) => chunk.trim())
		.filter(Boolean)
		.map((chunk) => ({ raw: chunk }));
}
