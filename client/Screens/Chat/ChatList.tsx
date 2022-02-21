import { NavigationProp, useNavigation } from "@react-navigation/native";
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

export interface ChatPreviewInterface {
	chatId: string;
	messageWith: string;
	lastMessage: string;
	messageTime: Date;
	userIcon: string;
}

const ChatList = () => {
	const { user } = useSelector((state: RootStore) => state.userReducer);
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [chatList, setChatList] = useState<ChatPreviewInterface[]>([]);

	const handleChatNavigation = (
		chatId: string,
		messageWith: string,
		profilePicture: string
	) => {
		navigation.navigate("ChatScreen", {
			chatId,
			messageWith,
			profilePicture,
		});
	};

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
					lastMessageTime: preview.messages[0].date,
				});
			});

			setChatList(allChats);
		})();
	}, []);

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
								chat.userIcon
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
