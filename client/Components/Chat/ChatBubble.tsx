import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import styles from "../../Styles/styles";

const ChatBubble = ({
	chat,
	sameUser,
	profilePicture,
}: {
	chat: ChatBubbleType;
	sameUser: boolean;
	profilePicture: string;
}) => {
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const messageByMe = () => {
		return chat.authorId === user.userId;
	};

	return (
		<View style={{ paddingHorizontal: 20, position: "relative" }}>
			<View
				style={
					messageByMe()
						? styles.rightChatBubbleContainer
						: styles.leftChatBubbleContainer
				}
			>
				{!messageByMe() && (
					<View style={styles.chatPreviewImageContainer}>
						{sameUser === false && (
							<Image
								style={styles.chatPreviewIcon}
								source={{
									uri: messageByMe() ? null : profilePicture,
								}}
							/>
						)}
					</View>
				)}

				<View
					style={
						messageByMe()
							? styles.rightBubbleTextContainer
							: styles.leftBubbleTextContainer
					}
				>
					<Text style={styles.leftBubbleText}>{chat.content}</Text>
				</View>
			</View>
		</View>
	);
};

export default ChatBubble;
