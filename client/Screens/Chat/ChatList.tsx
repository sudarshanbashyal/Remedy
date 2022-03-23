import {
	NavigationProp,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import ChatPreview from "../../Components/Chat/ChatPreview";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import styles from "../../Styles/styles";
import { SearchIcon } from "../../Styles/SVG/Svg";
import { getChatPreviews } from "../../Utils/Chat/getChatList";
import { formatText } from "../../Utils/FormatText/formatText";
import { handleNotification } from "../../Utils/Notification/notification";

export interface ChatPreviewInterface {
	chatId: string;
	messageWith: string;
	lastMessage: string;
	messageTime: Date;
	userIcon: string;
	recipentId: string;
	type: string;
	chatbot: boolean;
}

const chatBotPreviewDetails: ChatPreviewInterface = {
	chatId: "chatbot",
	messageWith: "Dr. Bot",
	lastMessage: "",
	messageTime: new Date(),
	userIcon:
		"https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Baymax.Big-Hero-6.webp",
	recipentId: "chatbot",
	type: "Text",
	chatbot: true,
};

const ChatList = () => {
	const focused = useIsFocused();
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const {
		userReducer: { user },
		applicationReducer: { socket },
	} = useSelector((state: RootStore) => state);

	const [chatList, setChatList] = useState<ChatPreviewInterface[]>([]);

	const handleChatNavigation = (
		chatId: string,
		messageWith: string,
		profilePicture: string,
		recipentId: string,
		chatbot: boolean
	) => {
		navigation.navigate("ChatScreen", {
			chatId,
			messageWith,
			profilePicture,
			recipentId: recipentId,
			chatbot,
		});
	};

	useEffect(() => {
		if (!socket) return;

		socket.on("chat_list_message", (newMessage) => {
			let requiredChat: ChatPreviewInterface = null;
			const otherChats: ChatPreviewInterface[] = [];

			for (let chat of chatList) {
				if (chat.chatId === newMessage.chatId) {
					requiredChat = chat;
				} else {
					otherChats.push(chat);
				}
			}

			const newChat: ChatPreviewInterface = {
				...requiredChat,
				lastMessage: newMessage.content,
			};

			const allChats = [newChat, ...otherChats];
			setChatList(allChats);

			// notification
			handleNotification(
				"New Message",
				`${requiredChat.messageWith}: ${formatText(
					newMessage.content,
					30
				)}`
			);
		});

		return () => {
			socket.removeListener("chat_list_message");
		};
	}, [chatList, socket]);

	useEffect(() => {
		(async () => {
			const allChats = await getChatPreviews(user.userId);

			setChatList([chatBotPreviewDetails, ...allChats]);
		})();
	}, [focused]);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.chatTitle}>My Chats</Text>

					<View style={{ marginTop: 10 }}>
						<SearchIcon size={20} color="white" />
					</View>
				</View>

				{chatList.map((chat: ChatPreviewInterface) => (
					<TouchableOpacity
						key={chat.chatId}
						onPress={() => {
							handleChatNavigation(
								chat.chatId,
								chat.messageWith,
								chat.userIcon,
								chat.recipentId,
								chat.chatbot
							);
						}}
					>
						<ChatPreview chat={chat} />
					</TouchableOpacity>
				))}
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default ChatList;
