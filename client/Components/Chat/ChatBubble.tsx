import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { DownloadIcon } from "../../Styles/SVG/Svg";
import { formatText } from "../../Utils/FormatText/formatText";
import {
	formatMessageTime,
	getDayDifference,
} from "../../Utils/FormatTime/formatTime";

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

	// determines whether the previous message is older than a day, if it is; do not let user hide the message time
	const [oldTime, setOldTime] = useState<boolean>(false);
	const [timeShown, setTimeShown] = useState<boolean>(false); // shows the message time on click

	const toggleTime = () => {
		if (oldTime) return;

		setTimeShown(!timeShown);
	};

	const messageByMe = () => {
		return chat.authorId === user.userId;
	};

	// figure out if old message
	useEffect(() => {}, []);

	return (
		<View
			style={{
				paddingHorizontal: 20,
				position: "relative",
			}}
		>
			{timeShown && (
				<View style={styles.chatScreenMessageContainer}>
					<Text style={styles.chatScreenMessage}>
						{formatMessageTime(new Date(chat.date))}
					</Text>
				</View>
			)}

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

				{chat.type === "Text" && (
					<TouchableOpacity
						onPress={toggleTime}
						style={
							messageByMe()
								? styles.rightBubbleTextContainer
								: styles.leftBubbleTextContainer
						}
					>
						<Text style={styles.leftBubbleText}>
							{chat.content}
						</Text>
					</TouchableOpacity>
				)}

				{chat.type === "Image" && (
					<TouchableOpacity
						style={{
							...(messageByMe()
								? styles.rightBubbleTextContainer
								: styles.leftBubbleTextContainer),
							...styles.imageTextContainer,
						}}
					>
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
					</TouchableOpacity>
				)}

				{chat.type === "File" && (
					<TouchableOpacity
						style={
							messageByMe()
								? styles.rightBubbleTextContainer
								: styles.leftBubbleTextContainer
						}
					>
						<View style={styles.messageFileContainer}>
							<TouchableOpacity
								style={styles.messageFileDownloadIcon}
							>
								<DownloadIcon
									size={30}
									color={colors.primaryWhite}
								/>
							</TouchableOpacity>

							<Text style={styles.leftBubbleText}>
								{formatText(chat.name.split("/")[1], 20)}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default ChatBubble;
