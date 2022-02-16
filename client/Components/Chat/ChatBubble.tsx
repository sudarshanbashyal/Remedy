import React from "react";
import { View, Text, Image } from "react-native";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import styles from "../../Styles/styles";

const ChatBubble = ({
	chat,
	sameUser,
}: {
	chat: ChatBubbleType;
	sameUser: boolean;
}) => {
	const currUser = 1;
	const currUserAvatar =
		"https://avatars.githubusercontent.com/u/5666218?v=4";
	const otherUserAvatar =
		"https://avatars.githubusercontent.com/u/8957173?v=4";

	const messageByMe = () => {
		return chat.from === currUser;
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
									uri: messageByMe()
										? currUserAvatar
										: otherUserAvatar,
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
					<Text style={styles.leftBubbleText}>{chat.message}</Text>
				</View>
			</View>
		</View>
	);
};

export default ChatBubble;
