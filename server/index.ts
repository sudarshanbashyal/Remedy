import Express, { json } from "express";
import cors from "cors";
import UserRouter from "./Routes/UserRoute";
import MedicineRouter from "./Routes/MedicineRoute";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server } from "socket.io";

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

	const io = new Server(server);

	io.on("connection", (socket) => {
		console.log("socket connected: ", socket.id);

		socket.on("userConnected", (cb) => {
			console.log("hello there");
			cb("hello");
		});
	});

	server.listen(process.env.port || 3000, () => {
		console.log("Up and up");
	});
};

init();
