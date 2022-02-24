import React from "react";
import { View, Text, Image } from "react-native";
import { ChatPreviewInterface } from "../../Screens/Chat/ChatList";
import styles from "../../Styles/styles";
import { formatMessageTime } from "../../Utils/FormatTime/formatTime";

const ChatPreview = ({ chat }: { chat: ChatPreviewInterface }) => {
	return (
		<View style={styles.chatPreview}>
			<View style={styles.chatPreviewImageContainer}>
				<Image
					style={styles.chatPreviewIcon}
					source={{ uri: chat.userIcon }}
				/>
			</View>

			<View style={styles.chatPreviewInfo}>
				<Text style={styles.chatPreviewName}>{chat.messageWith}</Text>

				<Text style={styles.chatPreviewMessage}>
					{chat.type === "Image"
						? `Image File`
						: chat.lastMessage
						? chat.lastMessage
						: "No Messages Yet."}
				</Text>
			</View>

			<View style={styles.chatPreviewRight}>
				<Text
					style={{
						...styles.chatPreviewMessage,
						...styles.chatPreviewTime,
					}}
				>
					{formatMessageTime(chat.messageTime)}
				</Text>

				{/*
				chat?.unread && <View style={styles.chatUnread}></View>
				*/}
			</View>
		</View>
	);
};

export default ChatPreview;
