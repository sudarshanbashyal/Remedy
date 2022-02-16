import {
	ADD_MEDICINE,
	DefaultUserStateType,
	FETCH_USER,
	LOGOUT_USER,
	MedicineType,
	UPDATE_MEDICINE,
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
			console.log(action.payload);
			return {
				...state,
				user: {
					...state.user,
					medicines: [...state.user.medicines, {}],
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
					medicine: newMedicines,
				},
			};

		default:
			return state;
	}
};
