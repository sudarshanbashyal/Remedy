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
					style={{
						...(messageByMe()
							? styles.rightBubbleTextContainer
							: styles.leftBubbleTextContainer),
						...(chat.type === "Image"
							? styles.imageTextContainer
							: {}),
					}}
				>
					{chat.type === "Text" ? (
						<Text style={styles.leftBubbleText}>
							{chat.content}
						</Text>
					) : (
						<View style={styles.messageImageContainer}>
							<Image
								style={{
									...styles.messageImage,
									...(messageByMe()
										? styles.rightImage
										: styles.leftImage),
								}}
								source={{ uri: chat.content }}
							/>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

export default ChatBubble;
