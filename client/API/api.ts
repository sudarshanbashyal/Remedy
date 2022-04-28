import { getUserToken } from "../Utils/AsyncStorage/asyncStorage";
import { ApiArgumentsType, ApiEndpointType } from "./apiTypes";

export const API_URL = "http://192.168.1.69:3000";

// order of the arguments
// mandatory params first: url, verb, auth
// then move on to body which is null by default but user passes an object
// and then finally query parameters which is null by default but user passes an array
export const makeApiCall = async (options: ApiArgumentsType) => {
	try {
		const { body, endpoint, queryParams, httpAction, auth } = options;

		const fullURL: string = configureFullURL(endpoint, queryParams);
		const reqHeaders = await configureHeaders(auth);
		const reqBody = configureBody(body);

		const apiOptions = {
			headers: reqHeaders,
			method: httpAction,
		};

		if (reqBody) {
			apiOptions["body"] = reqBody;
		}

		const response = await fetch(fullURL, apiOptions);
		const data = await response.json();

		return data;
	} catch (error) {
		return null;
	}
};

const configureFullURL = (
	endpoint: ApiEndpointType,
	queryParams: string[] | number[]
): string => {
	let fullURL = `${API_URL}/${endpoint}`;

	if (!queryParams) return fullURL;

	if (Array.isArray(queryParams) && queryParams.length > 0) {
		return `${fullURL}/${queryParams.join("/")}`;
	}

	return fullURL;
};

const configureHeaders = async (auth: boolean) => {
	const plainHeader = {
		"Content-Type": "application/json",
	};

	if (auth) {
		plainHeader["authorization"] = `bearer ${await getUserToken()}`;
	}

	return plainHeader;
};

const configureBody = (body: any): string => {
	if (body) {
		return JSON.stringify(body);
	}

	return null;
};
