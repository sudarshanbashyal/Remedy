import { Dispatch } from "redux";
import {
	ApplicationDispatchType,
	CHANGE_CURRENT_NAVIGATION,
	REGISTER_SOCKET,
} from "./ApplicationActionTypes";

const changeNavigationAction =
	(navigation: string) =>
	async (dispatch: Dispatch<ApplicationDispatchType>) => {
		dispatch({
			type: CHANGE_CURRENT_NAVIGATION,
			payload: navigation,
		});
	};

const registerSocketAction =
	(socket: WebSocket) =>
	async (dispatch: Dispatch<ApplicationDispatchType>) => {
		dispatch({
			type: REGISTER_SOCKET,
			payload: socket,
		});
	};

export { changeNavigationAction, registerSocketAction };
