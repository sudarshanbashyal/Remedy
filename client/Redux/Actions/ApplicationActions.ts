import { Dispatch } from "redux";
import { Socket } from "socket.io-client";
import ChatBot from "../../Utils/Diagnosis/diagnosis";
import {
	ApplicationDispatchType,
	CHANGE_CURRENT_NAVIGATION,
	REGISTER_CHATBOT,
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
	(socket: Socket<any>) =>
	async (dispatch: Dispatch<ApplicationDispatchType>) => {
		dispatch({
			type: REGISTER_SOCKET,
			payload: socket,
		});
	};

const registerChatbotAction =
	(chatbot: ChatBot = new ChatBot()) =>
	async (dispatch: Dispatch<ApplicationDispatchType>) => {
		dispatch({
			type: REGISTER_CHATBOT,
			payload: chatbot,
		});
	};

export { changeNavigationAction, registerSocketAction, registerChatbotAction };
