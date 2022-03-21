import { UserProfileType } from "../../Screens/Profile/ProfileSettings";

export const FETCH_USER = "FETCH_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_MEDICINE = "ADD_MEDICINE";
export const UPDATE_MEDICINE = "UPDATE_MEDICINE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_USER_ACCOUNT = "UPDATE_USER_ACCOUNT";

export interface DefaultUserStateType {
	user: null | UserType;
}

export interface UserType {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	dob: Date;
	bio?: string;
	gender: string;
	medicines?: MedicineType[];
	profilePicture: string;
	token: string;
}

export interface MedicineType {
	medicineId: string;
	name: string;
	description?: string;
	active: boolean;
	schedules?: ScheduleType[];
	days: number[];
}

export interface ScheduleType {
	scheuleId: string;
	hour: number;
	minutes: number;
	medicineId: string;
}

export interface fetchUser {
	type: typeof FETCH_USER;
	payload: UserType;
}

export interface logoutUser {
	type: typeof LOGOUT_USER;
}

export interface addMedicine {
	type: typeof ADD_MEDICINE;
	payload: MedicineType;
}

export interface updateMedicine {
	type: typeof UPDATE_MEDICINE;
	payload: {
		medicine: MedicineType;
		medicineId: string;
	};
}

export interface updateUserProfile {
	type: typeof UPDATE_USER_PROFILE;
	payload: {
		user: UserProfileType;
	};
}

export interface updateUserAccount {
	type: typeof UPDATE_USER_ACCOUNT;
	payload: string;
}

export type UserDispatchType =
	| fetchUser
	| logoutUser
	| addMedicine
	| updateMedicine
	| updateUserProfile
	| updateUserAccount;
