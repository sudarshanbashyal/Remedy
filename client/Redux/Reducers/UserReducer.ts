import {
	ADD_MEDICINE,
	DefaultUserStateType,
	FETCH_USER,
	LOGOUT_USER,
	MedicineType,
	UPDATE_MEDICINE,
	UPDATE_USER_ACCOUNT,
	UPDATE_USER_PROFILE,
	UserDispatchType,
} from "../Actions/UserActionTypes";

const defaultState: DefaultUserStateType = {
	user: null,
};

export const userReducer = (
	state: DefaultUserStateType = defaultState,
	action: UserDispatchType
) => {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				user: action.payload,
			};

		case LOGOUT_USER:
			return {
				...state,
				user: null,
			};

		case ADD_MEDICINE:
			return {
				...state,
				user: {
					...state.user,
					medicines: [...state.user.medicines, action.payload],
				},
			};

		case UPDATE_MEDICINE:
			const newMedicines = state.user.medicines.map(
				(med: MedicineType) => {
					if (med.medicineId !== action.payload.medicineId)
						return med;

					return action.payload.medicine;
				}
			);

			return {
				...state,
				user: {
					...state.user,
					medicines: newMedicines,
				},
			};

		case UPDATE_USER_PROFILE:
			return {
				...state,
				user: {
					...state.user,
					...action.payload.user,
				},
			};

		case UPDATE_USER_ACCOUNT:
			return {
				...state,
				user: {
					...state.user,
					email: action.payload,
				},
			};

		default:
			return state;
	}
};
