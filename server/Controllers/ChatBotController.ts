import { Request, Response } from "express";
import { serverError } from ".";
import { trainModel } from "../Utils/LanguageProcessing";
import stringSimilarity from "string-similarity";
import { symptomList, SymptomListType } from "../Utils/Symptoms";

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
			data: response,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};

export const reportSymptomSimilarity = async (req: Request, res: Response) => {
	try {
		const { symptom } = req.body;
		const symptomNames: string[] = symptomList.map(
			(sym: SymptomListType) => sym.Name
		);

		const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(
			symptom,
			symptomNames
		);

		if (bestMatch.rating < 0.5) {
			return res.json({
				ok: false,
				error: {
					message: "Couldnt analyze the symptom.",
				},
			});
		}

		return res.json({
			ok: true,
			symptom: symptomList[bestMatchIndex],
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
