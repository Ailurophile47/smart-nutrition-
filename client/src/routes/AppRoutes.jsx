import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import AddMeal from "../pages/AddMeal.jsx";
import ChatLogger from "../pages/ChatLogger.jsx";
import Analytics from "../pages/Analytics.jsx";
import Activity from "../pages/Activity.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/add-meal" element={<AddMeal />} />
			<Route path="/chat" element={<ChatLogger />} />
			<Route path="/analytics" element={<Analytics />} />
			<Route path="/activity" element={<Activity />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
}
