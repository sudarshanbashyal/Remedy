import {
	ApplicationDispatchType,
	CHANGE_CURRENT_NAVIGATION,
	DefaultApplicationStateType,
} from "../Actions/ApplicationActionTypes";

const defaultState: DefaultApplicationStateType = {
	currentNavigation: "ChatList",
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

		default:
			return state;
	}
};
