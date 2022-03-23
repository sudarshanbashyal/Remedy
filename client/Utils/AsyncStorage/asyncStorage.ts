import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";

export const getUserToken = async () => {
	try {
		const token = await AsyncStorage.getItem("token");

		return token || null;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const storeChatbotChats = async (chat: ChatBubbleType) => {
	try {
		let chats = await AsyncStorage.getItem("chatBotChats");
		if (!chats) {
			await AsyncStorage.setItem("chatBotChats", JSON.stringify([]));
		}

		chats = JSON.parse(await AsyncStorage.getItem("chatBotChats"));
		if (Array.isArray(chats)) {
			chats.push(chat);

			await AsyncStorage.setItem("chatBotChats", JSON.stringify(chats));
		}
	} catch (error) {
		console.error(error);
	}
};

export const getChatbotChats = async () => {
	try {
		return await AsyncStorage.getItem("chatBotChats");
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const remoteChatbotChats = async () => {
	try {
		await AsyncStorage.removeItem("chatBotChats");
	} catch (error) {
		console.error(error);
	}
};

export const storeUserToken = async (token: string) => {
	try {
		await AsyncStorage.setItem("token", token);
	} catch (error) {
		console.error(error);
	}
};

export const removeUserToken = async () => {
	try {
		await AsyncStorage.removeItem("token");
	} catch (error) {
		console.error(error);
	}
};
