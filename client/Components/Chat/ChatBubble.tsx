import React, { useState, useEffect } from "react";
import {
	PermissionsAndroid,
	View,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import RNFS, { downloadFile, DownloadResult } from "react-native-fs";
import { RootStore } from "../../Redux/store";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { DownloadIcon } from "../../Styles/SVG/Svg";
import { formatText } from "../../Utils/FormatText/formatText";
import { formatMessageTime } from "../../Utils/FormatTime/formatTime";
import { showToast } from "../../Utils/Toast";

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

	const getRealFileName = (name: string): string => {
		return name.split("/")[1];
	};

	const handleDownload = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
			);

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				const { promise }: { promise: Promise<DownloadResult> } =
					downloadFile({
						fromUrl: chat.content,
						toFile: `${
							RNFS.DownloadDirectoryPath
						}/${getRealFileName(chat.name)}`,
					});

				const { statusCode } = await promise;
				if (statusCode === 200) {
					showToast("success", "File Downloaded Successfully!");
				}
			}
		} catch (error) {
			showToast("error", "Could not download file. Please try again.");
		}
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
								onPress={handleDownload}
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
