import { PrismaDB } from "..";
import { Socket } from "socket.io";
import { MessageType } from "@prisma/client";
import { MESSAGE_PRESET, uploadImage } from "../Utils/clouinary";
import { UploadApiResponse } from "cloudinary";

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
	type,
	socket,
}: {
	authorId: string;
	content: string;
	chatId: string;
	recipentId: string;
	type: string;
	socket: Socket<any>;
}) => {
	try {
		const recipentSocket = getSocket(recipentId);

		let messageContent = content;

		if (type === "Image") {
			const response: UploadApiResponse | null = await uploadImage(
				`data:image/jpeg;base64,${content}`,
				MESSAGE_PRESET
			);

			if (response) {
				messageContent = response.secure_url;
			}
		}

		const newMessage = await PrismaDB.message.create({
			data: {
				authorId,
				type: type as MessageType,
				content: messageContent,
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

		socket.emit("chat_screen_message", newMessage);

		if (recipentSocket) {
			socket.to(recipentSocket).emit("chat_screen_message", newMessage);
			socket.to(recipentSocket).emit("chat_list_message", newMessage);

			/*
			socket.to(recipentSocket).emit("message_notification", newMessage);
			*/
		}
	} catch (error) {
		console.log(error);
	}
};