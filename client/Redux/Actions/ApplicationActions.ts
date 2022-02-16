import { Dispatch } from "redux";
import {
	ApplicationDispatchType,
	CHANGE_CURRENT_NAVIGATION,
} from "./ApplicationActionTypes";

const changeNavigationAction =
	(navigation: string) =>
	async (dispatch: Dispatch<ApplicationDispatchType>) => {
		dispatch({
			type: CHANGE_CURRENT_NAVIGATION,
			payload: navigation,
		});
	};

export { changeNavigationAction };
