import { Request, Response } from "express";
import dotenv from "dotenv";
import { serverError } from "../Controllers";
import { setApiMedicToken } from "./Auth";
import fetch from "node-fetch";

dotenv.config();

export const SYMPTOM_TYPE = "SYMPTOM";
export const DIAGNOSIS_TYPE = "DIAGNOSIS";
export const TREATMENT_TYPE = "TREATMENT";

type APIMedicRequestType =
	| typeof SYMPTOM_TYPE
	| typeof DIAGNOSIS_TYPE
	| typeof TREATMENT_TYPE;

const baseURL = "https://healthservice.priaid.ch";

const formRequestQuery = async (
	apiURL: string,
	...queryParams: string[]
): Promise<any> => {
	try {
		const { API_MEDIC_TOKEN } = process.env;
		const hostname = baseURL + apiURL;
		const tokenParam = `token=${API_MEDIC_TOKEN}&`;
		const languageQuery = `language=en-gb&`;
		const formatQuery = `format=json`;

		const fullURL =
			hostname +
			tokenParam +
			languageQuery +
			queryParams.join("") +
			formatQuery;

		const response = await fetch(fullURL);
		const data = await response.json();

		return data;
	} catch (error) {
		return null;
	}
};

export const requestMedicAPI = async (
	type: APIMedicRequestType,
	req: Request,
	res: Response
): Promise<any> => {
	try {
		let apiPath: string;
		const additionalParams: string[] = [];

		if (type === TREATMENT_TYPE) {
			const { issueId } = req.body;
			apiPath = `/issue/${issueId}/info?`;
		} else {
			apiPath =
				type === SYMPTOM_TYPE ? "/symptoms/proposed?" : "/diagnosis?";
			const { symptoms, gender, dob } = req.body;

			const symptomsQuery = `symptoms=[${symptoms.toString()}]&`;
			const genderQuery = `gender=${
				gender === "Other" ? "Male" : gender
			}&`;
			const dobQuery = `year_of_birth=${dob}&`;

			additionalParams.push(symptomsQuery, genderQuery, dobQuery);
		}

		const data = await formRequestQuery(apiPath, ...additionalParams);

		if (data === "Invalid token") {
			await setApiMedicToken();
			return await requestMedicAPI(type, req, res);
		}

		return res.json({
			ok: true,
			proposedData: data,
		});
	} catch (error) {
		return serverError(error as Error, res);
	}
};
