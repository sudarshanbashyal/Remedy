import { Request, Response } from "express";
import dotenv from "dotenv";
import { serverError } from "../Controllers";
import { setApiMedicToken } from "./Auth";
import fetch from "node-fetch";

dotenv.config();

export const SYMPTOM_TYPE = "SYMPTOM";
export const DIAGNOSIS_TYPE = "DIAGNOSIS";

type APIMedicRequestType = typeof SYMPTOM_TYPE | typeof DIAGNOSIS_TYPE;

export const makeRequest = async (
	type: APIMedicRequestType,
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const baseURL = "https://healthservice.priaid.ch";
		const apiURL =
			baseURL +
			(type === SYMPTOM_TYPE ? "/symptoms/proposed?" : "/diagnosis?");

		const { symptoms, gender, dob } = req.body;
		const { API_MEDIC_TOKEN } = process.env;

		const token = `token=${API_MEDIC_TOKEN}&`;
		const languageQuery = `language=en-gb&`;
		const symptomsQuery = `symptoms=[${symptoms.toString()}]&`;
		const genderQuery = `gender=${gender === "Other" ? "Male" : gender}&`;
		const dobQuery = `year_of_birth=${dob}&`;
		const formatQuery = `format=json`;

		const fullURL =
			apiURL +
			token +
			languageQuery +
			symptomsQuery +
			genderQuery +
			dobQuery +
			formatQuery;

		console.log(fullURL);

		const response = await fetch(fullURL);
		const data = await response.json();

		if (data === "Invalid token") {
			console.log("invalid token");

			await setApiMedicToken();
			return await makeRequest(type, req, res);
		}

		return res.json({
			ok: true,
			proposedData: data,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};

