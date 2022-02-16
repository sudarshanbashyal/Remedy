import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import ChatPreview from "../../Components/Chat/ChatPreview";
import { RootStackType } from "../../Stacks/RootStack";
import styles from "../../Styles/styles";
import { SearchIcon } from "../../Styles/SVG/Svg";

export interface ChatPreviewInterface {
	messageUserName: string;
	lastMessage: string;
	lastMessageTime?: string;
	userIcon: string;
	unread?: boolean;
	chatBot?: boolean;
}

const ChatList = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const chats: ChatPreviewInterface[] = [
		{
			messageUserName: "Dr. Bot",
			lastMessage: "",
			userIcon:
				"https://thumbs.dreamstime.com/b/medical-friendly-android-robot-stethoscope-doctor-concept-vector-164508702.jpg",
			chatBot: true,
		},
		{
			messageUserName: "Dr. Matthew White",
			lastMessage: "Hello there",
			lastMessageTime: "7:53 am",
			userIcon: "https://avatars.githubusercontent.com/u/8957173?v=4",
			unread: true,
		},
		{
			messageUserName: "Dr. Matthew White",
			lastMessage: "Hello there",
			lastMessageTime: "7:53 am",
			userIcon: "https://avatars.githubusercontent.com/u/8957173?v=4",
		},
		{
			messageUserName: "Dr. Matthew White",
			lastMessage: "Hello there",
			lastMessageTime: "7:53 am",
			userIcon: "https://avatars.githubusercontent.com/u/8957173?v=4",
		},
		{
			messageUserName: "Dr. Matthew White",
			lastMessage: "Hello there",
			lastMessageTime: "7:53 am",
			userIcon: "https://avatars.githubusercontent.com/u/8957173?v=4",
		},
	];

	const handleChatNavigation = () => {
		navigation.navigate("ChatScreen");
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.chatTitle}>My Chats</Text>

					<View style={{ marginTop: 10 }}>
						<SearchIcon size={20} color="white" />
					</View>
				</View>

				{chats.map((chat: ChatPreviewInterface, index: number) => (
					<TouchableOpacity
						key={index}
						onPress={handleChatNavigation}
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
