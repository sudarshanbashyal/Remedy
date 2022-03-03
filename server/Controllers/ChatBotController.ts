import { Request, Response } from "express";
import { serverError } from ".";
import { trainModel } from "../Utils/NLP";

let nlp: any;
const getNlp = async () => {
	const trailedNlp = await trainModel();
	nlp = trailedNlp;
};

getNlp();

export const analyzeMessageIntent = async (req: Request, res: Response) => {
	try {
		console.log("req:", req.body);

		const { message } = req.body;
		const response = await nlp.process("en", message);
		console.log(response);

		return res.json({
			ok: true,
			data: response,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
