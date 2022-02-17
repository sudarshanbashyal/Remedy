import {
	ADD_MEDICINE,
	FETCH_USER,
	LOGOUT_USER,
	MedicineType,
	UPDATE_MEDICINE,
	UserDispatchType,
	UserType,
} from "../Actions/UserActionTypes";
import { Dispatch } from "redux";
import { showToast } from "../../Utils/Toast";
import {
	removeUserToken,
	storeUserToken,
} from "../../Utils/AsyncStorage/asyncStorage";
import {
	bgoptions,
	createChannel,
	handleScheduling,
} from "../../Utils/Notification/notification";
import BackgroundService from "react-native-background-actions";

const loginUserAction =
	(user: UserType) => async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: FETCH_USER,
			payload: user,
		});

		// store JWT token in async storage
		await storeUserToken(user.token);

		// create notification channel
		createChannel();

		// start the background scheduling job
		if (user?.medicines) {
			await BackgroundService.start(handleScheduling, {
				...bgoptions,
				parameters: {
					medicines: user.medicines,
				},
			});
		}
	};

const logoutUserAction = () => async (dispatch: Dispatch<UserDispatchType>) => {
	dispatch({
		type: LOGOUT_USER,
	});

	// remote JWT token after log out
	await removeUserToken();

	showToast("success", "Successfully Logged Out.");
};

const addMedicineAction =
	(medicine: MedicineType) =>
	async (dispatch: Dispatch<UserDispatchType>) => {
		dispatch({
			type: ADD_MEDICINE,
			payload: medicine,
		});
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
	};

export {
	loginUserAction,
	logoutUserAction,
	addMedicineAction,
	updateMedicineAction,
};
