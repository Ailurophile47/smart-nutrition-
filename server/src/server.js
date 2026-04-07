import dotenv from "dotenv";
dotenv.config();
import net from "node:net";
import app from "./app.js";
import env from "./config/env.js";
import { connectDB } from "./config/db.js";

function getAvailablePort(startPort) {
	return new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.on("error", (error) => {
			if (error.code === "EADDRINUSE") {
				resolve(getAvailablePort(startPort + 1));
				return;
			}
			reject(error);
		});

		server.listen(startPort, () => {
			const { port } = server.address();
			server.close(() => resolve(port));
		});
	});
}

async function bootstrap() {
	await connectDB();
	const preferredPort = Number(env.PORT) || 5000;
	const port = await getAvailablePort(preferredPort);

	if (port !== preferredPort) {
		// eslint-disable-next-line no-console
		console.warn(`Port ${preferredPort} in use. Switched to ${port}.`);
	}

	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server running on port ${port}`);
	});
}

bootstrap().catch((error) => {
	// eslint-disable-next-line no-console
	console.error("Failed to start server", error);
	process.exit(1);
});
