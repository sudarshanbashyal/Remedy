import WebSocket from "ws";

interface RoomsType {
	[key: string]: WebSocket | null;
}

const rooms: RoomsType = {};

export const addSocket = (id: string, socket: WebSocket) => {
	rooms[id as keyof RoomsType] = socket;
	console.log(id);
};

export const removeSocket = (id: string) => {
	rooms[id] = null;
};

export const getSocket = (id: keyof RoomsType) => {
	console.log(id);
	return rooms[id] || null;
};

export const sendNotification = (id: string) => {
	const socket = getSocket(id as keyof RoomsType);

	if (socket) {
		socket.send(
			JSON.stringify({
				type: "ring_notification",
				payload: "hello world",
			})
		);
	}
};
