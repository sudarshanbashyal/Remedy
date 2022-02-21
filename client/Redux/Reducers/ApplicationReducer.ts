import {
	ApplicationDispatchType,
	CHANGE_CURRENT_NAVIGATION,
	DefaultApplicationStateType,
	REGISTER_SOCKET,
} from "../Actions/ApplicationActionTypes";

const defaultState: DefaultApplicationStateType = {
	currentNavigation: "ChatList",
	socket: null,
};

export const applicationReducer = (
	state: DefaultApplicationStateType = defaultState,
	action: ApplicationDispatchType
) => {
	switch (action.type) {
		case CHANGE_CURRENT_NAVIGATION:
			return {
				...state,
				currentNavigation: action.payload,
			};

		case REGISTER_SOCKET:
			return {
				...state,
				socket: action.payload,
			};

		default:
			return state;
	}
};
