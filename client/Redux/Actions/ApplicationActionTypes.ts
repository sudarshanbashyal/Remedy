import { Socket } from "socket.io-client";
import ChatBot from "../../Utils/Diagnosis/diagnosis";

export const CHANGE_CURRENT_NAVIGATION = "CHANGE_CURRENT_NAVIGATION";
export const REGISTER_SOCKET = "REGISTER_SOCKET";
export const REGISTER_CHATBOT = "REGISTER_CHATBOT";

export interface DefaultApplicationStateType {
	currentNavigation: string;
	currentRoute: string;
	socket: Socket<any> | null;
	chatBot: ChatBot;
}

export interface ChangeNavigation {
	type: typeof CHANGE_CURRENT_NAVIGATION;
	payload: string;
}

export interface RegisterSocket {
	type: typeof REGISTER_SOCKET;
	payload: any;
}

export interface RegisterChatbot {
	type: typeof REGISTER_CHATBOT;
	payload: ChatBot;
}

export type ApplicationDispatchType =
	| ChangeNavigation
	| RegisterSocket
	| RegisterChatbot;
