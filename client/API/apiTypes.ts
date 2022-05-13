export const CHECK_EMAIL = "checkEmail";
export const REGISTER_USER = "registerUser";
export const LOGIN_USER = "loginUser";
export const FETCH_USER = "fetchUser";
export const ADD_MEDICINE = "addMedicine";
export const GET_MEDICINE_LIST = "getMedicineList";
export const GET_MEDICINE_DETAILS = "getMedicineDetails";
export const UPDATE_MEDICINE_DETAILS = "updateMedicine";
export const GET_FREQUENCIES = "getFrequencies";
export const UPDATE_USER_PROFILE = "updateUserProfile";
export const UPDATE_USER_ACCOUNT = "updateUserAccount";
export const GET_MESSAGE_LIST = "getMessageList";
export const GET_CHAT_MESSAGES = "getChatMessages";
export const GET_CHAT_MEDIA = "getChatMedia";
export const ANALYZE_MESSAGE_INTENT = "analyzeMessageIntent";
export const REPORT_SYMPTOM_SIMILARITY = "reportSymptomSimilarity";
export const GET_SIMILAR_SYMPTOMS = "getSimilarSymptoms";
export const GET_DIAGNOSIS = "getDiagnosis";
export const GET_DOCTORS = "getDoctors";
export const ADD_MESSAGE_REQUEST = "addMessageRequest";
export const GET_INCOMING_REQUESTS = "getIncomingRequests";
export const CHANGE_REQUEST_STATUS = "changeRequestStatus";
export const GET_INTAKE = "getIntake";
export const UPDATE_INTAKE_STATUS = "updateIntakeStatus";
export const GET_SPECIALIZED_HOSPITALS = "getSpecializedHospitals";
export const GET_MEDICAL_REFERENCE = "getMedicalReference";

export type ApiEndpointType =
	| typeof CHECK_EMAIL
	| typeof REGISTER_USER
	| typeof LOGIN_USER
	| typeof FETCH_USER
	| typeof ADD_MEDICINE
	| typeof GET_MEDICINE_LIST
	| typeof GET_MEDICINE_DETAILS
	| typeof UPDATE_MEDICINE_DETAILS
	| typeof GET_FREQUENCIES
	| typeof UPDATE_USER_PROFILE
	| typeof UPDATE_USER_ACCOUNT
	| typeof GET_MESSAGE_LIST
	| typeof GET_CHAT_MESSAGES
	| typeof GET_CHAT_MEDIA
	| typeof ANALYZE_MESSAGE_INTENT
	| typeof REPORT_SYMPTOM_SIMILARITY
	| typeof GET_SIMILAR_SYMPTOMS
	| typeof GET_DIAGNOSIS
	| typeof GET_DOCTORS
	| typeof ADD_MESSAGE_REQUEST
	| typeof GET_INCOMING_REQUESTS
	| typeof CHANGE_REQUEST_STATUS
	| typeof GET_INTAKE
	| typeof UPDATE_INTAKE_STATUS
	| typeof GET_SPECIALIZED_HOSPITALS
	| typeof GET_MEDICAL_REFERENCE;

export const HTTP_POST = "POST";
export const HTTP_GET = "GET";
export const HTTP_PUT = "PUT";
export const HTTP_DELETE = "DELETE";

export type HTTPActionType =
	| typeof HTTP_POST
	| typeof HTTP_GET
	| typeof HTTP_PUT
	| typeof HTTP_DELETE;

// typeof argument object
export type ApiArgumentsType = {
	endpoint: ApiEndpointType;
	httpAction: HTTPActionType;
	auth?: boolean;
	body?: any;
	queryParams?: string[] | number[];
};
