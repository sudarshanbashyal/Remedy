export const CHANGE_CURRENT_NAVIGATION = "CHANGE_CURRENT_NAVIGATION";
export const REGISTER_SOCKET = "REGISTER_SOCKET";

export interface DefaultApplicationStateType {
	currentNavigation: string;
	socket: WebSocket | null;
}

export interface ChangeNavigation {
	type: typeof CHANGE_CURRENT_NAVIGATION;
	payload: string;
}

export interface RegisterSocket {
	type: typeof REGISTER_SOCKET;
	payload: WebSocket;
}

export type ApplicationDispatchType = ChangeNavigation | RegisterSocket;
