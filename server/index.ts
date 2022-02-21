import Express, { json } from "express";
import cors from "cors";
import UserRouter from "./Routes/UserRoute";
import MedicineRouter from "./Routes/MedicineRoute";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import WebSocket from "ws";
import { addSocket, removeSocket, sendNotification } from "./Socket/hub";

export const PrismaDB = new PrismaClient();

const init = async () => {
	const app = Express();
	app.use(
		json({
			limit: "50mb",
		}),
		cors(),
		UserRouter,
		MedicineRouter
	);

	// ws server config
	const server = createServer(app);

	const wss = new WebSocket.Server({ server });
	wss.on("connection", (socket: WebSocket) => {
		socket.on("message", (incomingBuffer) => {
			const data = JSON.parse(incomingBuffer.toString());
			console.log(data.type);

			switch (data.type) {
				case "client_socket_connection":
					addSocket(data.payload, socket);
					break;

				case "send_notification":
					sendNotification(data.payload);
					break;

				case "client_socket_close":
					removeSocket(data.payload);
					break;

				default:
					console.log("");
			}
		});

		socket.on("close", () => {
			console.log("Socket Left =(");
		});
	});

	server.listen(process.env.port || 3000, () => {
		console.log("Up and up");
	});
};

init();
