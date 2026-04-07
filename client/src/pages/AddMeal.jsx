import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listFoods } from "../services/foodService";
import { addMeal } from "../services/mealService";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function AddMeal() {
	const navigate = useNavigate();

	const [foods, setFoods] = useState([]);
	const [mealType, setMealType] = useState("lunch");
	const [selectedFoodId, setSelectedFoodId] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [items, setItems] = useState([]); // { foodId, quantity, name, unit }
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		listFoods()
			.then((data) => {
				setFoods(data);
				if (data.length > 0) setSelectedFoodId(data[0]._id);
			})
			.catch(() => setError("Failed to load food list."));
	}, []);

	function handleAddItem() {
		if (!selectedFoodId) return;
		if (quantity <= 0) {
			setError("Quantity must be greater than 0.");
			return;
		}

		const food = foods.find((f) => f._id === selectedFoodId);
		setItems((prev) => [...prev, { foodId: selectedFoodId, quantity, name: food.name, unit: food.unit }]);
		setQuantity(1);
		setError("");
	}

	function handleRemoveItem(index) {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");

		if (items.length === 0) {
			setError("Add at least one food item.");
			return;
		}

		setSubmitting(true);
		try {
			await addMeal({
				mealType,
				items: items.map(({ foodId, quantity }) => ({ foodId, quantity })),
			});
			navigate("/dashboard");
		} catch (err) {
			const msg = err.response?.data?.message || "Failed to save meal.";
			setError(msg);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<main className="page-shell" style={{ maxWidth: "700px" }}>
			<h1 className="page-title">Add Meal</h1>
			<p className="page-subtitle">Select foods and quantities — macros are calculated automatically.</p>

			<form className="card-panel" onSubmit={handleSubmit}>
				{/* Meal Type */}
				<label className="block text-sm" style={{ marginBottom: "0.9rem" }}>
					<span className="field-label">Meal Type</span>
					<select
						className="field-input"
						value={mealType}
						onChange={(e) => setMealType(e.target.value)}
					>
						{MEAL_TYPES.map((t) => (
							<option key={t} value={t}>
								{t.charAt(0).toUpperCase() + t.slice(1)}
							</option>
						))}
					</select>
				</label>

				{/* Food Selector Row */}
				<div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-end", marginBottom: "0.9rem" }}>
					<label style={{ flex: 2 }}>
						<span className="field-label">Food</span>
						<select
							className="field-input"
							value={selectedFoodId}
							onChange={(e) => setSelectedFoodId(e.target.value)}
							disabled={foods.length === 0}
						>
							{foods.length === 0 && <option>Loading foods...</option>}
							{foods.map((f) => (
								<option key={f._id} value={f._id}>
									{f.name} ({f.unit})
								</option>
							))}
						</select>
					</label>

					<label style={{ flex: 1 }}>
						<span className="field-label">Quantity</span>
						<input
							className="field-input"
							type="number"
							min="0.1"
							step="0.1"
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
						/>
					</label>

					<button
						type="button"
						className="btn btn-outline"
						onClick={handleAddItem}
						style={{ whiteSpace: "nowrap", marginBottom: "0" }}
					>
						+ Add Item
					</button>
				</div>

				{/* Items List */}
				{items.length > 0 && (
					<ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
						{items.map((item, i) => (
							<li
								key={i}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "0.45rem 0.6rem",
									borderRadius: "8px",
									background: "var(--brand-soft)",
									marginBottom: "0.4rem",
									fontSize: "0.9rem",
								}}
							>
								<span>
									<strong>{item.name}</strong> — {item.quantity} {item.unit}
								</span>
								<button
									type="button"
									onClick={() => handleRemoveItem(i)}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
										color: "var(--text-1)",
										fontSize: "1rem",
										lineHeight: 1,
									}}
									aria-label="Remove item"
								>
									✕
								</button>
							</li>
						))}
					</ul>
				)}

				{error && (
					<p style={{ color: "#c0392b", fontSize: "0.88rem", marginBottom: "0.75rem" }}>{error}</p>
				)}

				<button
					className="btn btn-primary"
					type="submit"
					disabled={submitting || items.length === 0}
					style={{ opacity: items.length === 0 ? 0.6 : 1 }}
				>
					{submitting ? "Saving..." : "Save Meal"}
				</button>
			</form>
		</main>
	);
}
