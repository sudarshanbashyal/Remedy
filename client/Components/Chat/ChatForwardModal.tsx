import React, { SetStateAction, Dispatch } from "react";
import {
	View,
	Modal,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { CancelIcon } from "../../Styles/SVG/Svg";
import { showToast } from "../../Utils/Toast";

const ChatForwardModal = ({
	modalOpen,
	setModalOpen,
	messagePreviews,
	chat,
}: {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	messagePreviews: any;
	chat: ChatBubbleType;
}) => {
	const {
		applicationReducer: { socket },
		userReducer: { user },
	} = useSelector((state: RootStore) => state);

	const handleForwarding = (recipentId: string, chatId: string) => {
		if (!socket) {
			showToast("error", "Could not forward message");
			return;
		}

		const payload = {
			authorId: user.userId,
			type: "Text",
			content: chat.content,
			recipentId,
			chatId,
			fileExtension: null,
			name: "",
			chatBot: true,
		};

		socket.emit("handle_message", payload);
	};

	return (
		<Modal animationType="slide" visible={modalOpen} transparent={true}>
			<View
				style={{
					...styles.chatModalOuterContainer,
					height: "100%",
					width: "100%",
				}}
			>
				<ScrollView>
					<View style={styles.chatModalContainer}>
						<View style={styles.spacedApartContainer}>
							<Text style={styles.chatModalTitle}>
								Forward Text
							</Text>

							<TouchableOpacity
								onPress={() => {
									setModalOpen(false);
								}}
							>
								<CancelIcon
									size={24}
									color={colors.opaqueWhite}
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.chatModalListsContainer}>
							{messagePreviews.map((preview: any) => (
								<View
									style={{
										...styles.spacedApartContainer,
										marginBottom: 20,
									}}
									key={preview.chatId}
								>
									<View style={styles.rowStartContainer}>
										<View
											style={
												styles.chatPreviewImageContainer
											}
										>
											<Image
												style={styles.chatPreviewIcon}
												source={{
													uri: preview.userIcon,
												}}
											/>
										</View>

										<Text
											style={styles.chatModalMessageWith}
										>
											{preview.messageWith}
										</Text>
									</View>

									<TouchableOpacity
										onPress={() => {
											handleForwarding(
												preview.recipentId,
												preview.chatId
											);
										}}
									>
										<View
											style={
												styles.outlineYellowButtonContainer
											}
										>
											<Text
												style={
													styles.outlineYellowButton
												}
											>
												Send
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				</ScrollView>
			</View>
		</Modal>
	);
};

export default ChatForwardModal;
