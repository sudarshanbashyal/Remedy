import {
	NavigationProp,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { getMessageList } from "../../API/api";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import ChatPreview from "../../Components/Chat/ChatPreview";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import styles from "../../Styles/styles";
import { SearchIcon } from "../../Styles/SVG/Svg";
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
}

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
		recipentId: string
	) => {
		navigation.navigate("ChatScreen", {
			chatId,
			messageWith,
			profilePicture,
			recipentId: recipentId,
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
			const allChats = [];
			const { data } = await getMessageList();

			data.forEach((preview) => {
				allChats.push({
					chatId: preview.chatId,
					messageWith:
						preview.secondParticipant.userId === user.userId
							? preview.firstParticipant.firstName +
							  " " +
							  preview.firstParticipant.lastName
							: preview.secondParticipant.firstName +
							  " " +
							  preview.secondParticipant.lastName,
					userIcon:
						preview.secondParticipant.userId === user.userId
							? preview.firstParticipant.profilePicture
							: preview.secondParticipant.profilePicture,
					lastMessage: formatText(preview.messages[0].content, 32),
					messageTime: preview.messages[0].date,
					recipentId:
						preview.firstParticipant.userId === user.userId
							? preview.secondParticipant.userId
							: preview.firstParticipant.userId,
					type: preview.messages[0].type,
				});
			});

			setChatList(allChats);
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
								chat.recipentId
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
