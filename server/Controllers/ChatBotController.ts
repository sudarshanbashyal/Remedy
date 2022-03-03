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
		const { message } = req.body;
		const response = await nlp.process("en", message);

		return res.json({
			ok: true,
			response,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
