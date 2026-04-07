import { useState } from "react";

export default function ChatLogger() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([
		{ id: 1, role: "assistant", text: "Try: 2 roti + paneer bhurji 150g" },
	]);

	const handleSend = (event) => {
		event.preventDefault();
		if (!input.trim()) {
			return;
		}

		setMessages((prev) => [
			...prev,
			{ id: Date.now(), role: "user", text: input },
			{ id: Date.now() + 1, role: "assistant", text: "Parser integration is next: build parser." },
		]);
		setInput("");
	};

	return (
		<main className="page-shell" style={{ maxWidth: "840px" }}>
			<h1 className="page-title">Chat Logger</h1>
			<p className="page-subtitle">Describe your meal naturally, then convert it into structured nutrition logs.</p>
			<div className="chat-window">
				{messages.map((msg) => (
					<div key={msg.id} className={`chat-bubble ${msg.role}`}>
						{msg.text}
					</div>
				))}
			</div>
			<form className="chat-form" onSubmit={handleSend}>
				<input
					className="field-input"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="e.g., 2 roti + paneer bhurji 150g"
				/>
				<button className="btn btn-primary" type="submit">
					Send
				</button>
			</form>
		</main>
	);
}
