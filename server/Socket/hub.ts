import { PrismaDB } from "..";
import { Socket } from "socket.io";

interface ActiveSocketsType {
	[key: string]: string | string[];
}

const activeSockets: ActiveSocketsType = {};

export const addSocket = (id: string, socket: string) => {
	activeSockets[id as keyof ActiveSocketsType] = socket;
	console.log(activeSockets);
};

export const removeSocket = (id: string) => {
	delete activeSockets[id];
	console.log(activeSockets);
};

export const getSocket = (id: keyof ActiveSocketsType) => {
	return activeSockets[id];
};

export const handleMessage = async ({
	authorId,
	content,
	chatId,
	recipentId,
	socket,
}: {
	authorId: string;
	content: string;
	chatId: string;
	recipentId: string;
	socket: Socket<any>;
}) => {
	try {
		const recipentSocket = getSocket(recipentId);

		const newMessage = await PrismaDB.message.create({
			data: {
				authorId,
				type: "Text",
				content,
				chatId,
			},
			select: {
				authorId: true,
				type: true,
				chatId: true,
				date: true,
				content: true,
			},
		});

		socket.emit("message_sent", newMessage);
		socket.to(recipentSocket).emit("message_sent", newMessage);
	} catch (error) {
		console.log(error);
	}
};
