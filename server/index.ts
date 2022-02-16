import Express, { json } from "express";
import cors from "cors";
import UserRouter from "./Routes/UserRoute";
import MedicineRouter from "./Routes/MedicineRoute";
import { PrismaClient } from "@prisma/client";

export const PrismaDB = new PrismaClient();

const main = async () => {
	const app = Express();

	app.use(json(), cors(), UserRouter, MedicineRouter);

	app.listen(process.env.port || 3000, () => {
		console.log("Up and up");
	});
};

main();
