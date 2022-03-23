import {
	ADD_MEDICINE,
	FETCH_USER,
	LOGOUT_USER,
	MedicineType,
	UPDATE_MEDICINE,
	UPDATE_USER_ACCOUNT,
	UPDATE_USER_PROFILE,
	UserDispatchType,
	UserType,
} from "../Actions/UserActionTypes";
import { Dispatch } from "redux";
import { showToast } from "../../Utils/Toast";
import {
	remoteChatbotChats,
	removeUserToken,
	storeUserToken,
} from "../../Utils/AsyncStorage/asyncStorage";
import {
	bgoptions,
	createChannel,
	handleScheduling,
	stopScheduling,
} from "../../Utils/Notification/notification";
import BackgroundService from "react-native-background-actions";
import { UserProfileType } from "../../Screens/Profile/ProfileSettings";

const loginUserAction =
	(user: UserType) => async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: FETCH_USER,
			payload: user,
		});

		// store JWT token in async storage
		if (user.token) {
			await storeUserToken(user.token);
		}

		// create notification channel
		createChannel();

		// start the background scheduling job
		if (user?.medicines) {
			await stopScheduling();
			await BackgroundService.start(handleScheduling, bgoptions);
		}
	};

const logoutUserAction = () => async (dispatch: Dispatch<UserDispatchType>) => {
	dispatch({
		type: LOGOUT_USER,
	});

	// remote JWT token and chatbot chats after log out
	await removeUserToken();
	await remoteChatbotChats();

	showToast("success", "Successfully Logged Out.");
};

const addMedicineAction =
	(medicine: MedicineType) =>
	async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: ADD_MEDICINE,
			payload: medicine,
		});

		await stopScheduling();
		await BackgroundService.start(handleScheduling, bgoptions);
	};

const updateMedicineAction =
	(medicineId: string, medicine: MedicineType) =>
	async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: UPDATE_MEDICINE,
			payload: {
				medicine,
				medicineId,
			},
		});

		await stopScheduling();
		await BackgroundService.start(handleScheduling, bgoptions);
	};

const updateUserProfileAction =
	(user: UserProfileType) => async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: UPDATE_USER_PROFILE,
			payload: {
				user,
			},
		});
	};

const updateUserAccountAction =
	(email: string) => async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: UPDATE_USER_ACCOUNT,
			payload: email,
		});
	};

export {
	loginUserAction,
	logoutUserAction,
	addMedicineAction,
	updateMedicineAction,
	updateUserProfileAction,
	updateUserAccountAction,
};
