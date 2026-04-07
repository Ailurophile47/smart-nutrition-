import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDailyTotals, getMealsByDate } from "../services/mealService";

const EMPTY_TOTALS = { calories: 0, protein: 0, carbs: 0, fat: 0 };

function todayISO() {
	return new Date().toISOString().split("T")[0];
}

export default function Dashboard() {
	const [totals, setTotals] = useState(EMPTY_TOTALS);
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const today = todayISO();

		Promise.all([getDailyTotals(today), getMealsByDate(today)])
			.then(([totalsRes, mealsRes]) => {
				setTotals(totalsRes.data ?? EMPTY_TOTALS);
				setMeals(mealsRes.data ?? []);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	return (
		<main className="page-shell">
			<h1 className="page-title">Dashboard</h1>
			<p className="page-subtitle">Today's nutrition summary — {todayISO()}</p>

			<div className="stats-grid">
				<MacroCard title="Calories" value={totals.calories} unit="kcal" loading={loading} />
				<MacroCard title="Protein" value={totals.protein} unit="g" loading={loading} />
				<MacroCard title="Carbs" value={totals.carbs} unit="g" loading={loading} />
				<MacroCard title="Fat" value={totals.fat} unit="g" loading={loading} />
			</div>

			<div className="row-actions">
				<Link className="btn btn-primary" to="/add-meal">
					Add Meal
				</Link>
				<Link className="btn btn-outline" to="/chat">
					Open Chat Logger
				</Link>
			</div>

			{!loading && meals.length > 0 && (
				<section style={{ marginTop: "1.5rem" }}>
					<h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
						Today's Meals
					</h2>
					<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
						{meals.map((meal) => (
							<MealCard key={meal._id} meal={meal} />
						))}
					</div>
				</section>
			)}

			{!loading && meals.length === 0 && (
				<p style={{ marginTop: "1.5rem", color: "var(--text-1)", fontSize: "0.92rem" }}>
					No meals logged today. <Link to="/add-meal" style={{ color: "var(--brand)", fontWeight: 600 }}>Add your first meal.</Link>
				</p>
			)}
		</main>
	);
}

function MacroCard({ title, value, unit, loading }) {
	return (
		<article className="stat-card">
			<h2 className="stat-label">{title}</h2>
			<p className="stat-value">
				{loading ? "—" : `${value} ${unit}`}
			</p>
		</article>
	);
}

function MealCard({ meal }) {
	return (
		<div className="card-panel">
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
				<span style={{ fontWeight: 700, textTransform: "capitalize" }}>{meal.mealType}</span>
				<span style={{ fontSize: "0.82rem", color: "var(--text-1)" }}>
					{meal.totals.calories} kcal · {meal.totals.protein}g protein · {meal.totals.carbs}g carbs · {meal.totals.fat}g fat
				</span>
			</div>
			<ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.88rem", color: "var(--text-1)" }}>
				{meal.items.map((item, i) => (
					<li key={i}>
						{item.food?.name ?? "Unknown food"} — {item.quantity} {item.food?.unit ?? ""}
					</li>
				))}
			</ul>
		</div>
	);
}
