import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Keyboard } from "react-native";
import styles from "../../Styles/styles";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatBubble from "../../Components/Chat/ChatBubble";
import ChatInput from "../../Components/Chat/ChatInput";
import { getChatMessages } from "../../API/api";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import { useIsFocused } from "@react-navigation/native";

export type ChatBubbleType = {
	authorId: string;
	content: string;
	date: string;
	type: string;
};

export interface ImagePreviewType {
	base64: string;
	uri: string;
	fileName: string;
}

const ChatScreen = ({ route }) => {
	const {
		applicationReducer: { socket },
		userReducer: { user },
	} = useSelector((state: RootStore) => state);

	const { chatId, messageWith, profilePicture, recipentId } = route.params;

	const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

	const [firstLoad, setFirstLoad] = useState<boolean>(false);

	const [chats, setChats] = useState<ChatBubbleType[]>([]);
	const [text, setText] = useState<string>("");
	const [imageInfo, setImageInfo] = useState<ImagePreviewType | null>(null);

	const [inputActive, setInputActive] = useState<boolean>(false);

	const focused = useIsFocused();
	const scrollViewRef = useRef(null);

	const handleKeyboardShow = (e: any) => {
		setKeyboardOffset(e.endCoordinates.height);
	};

	const handleKeyboardHide = () => {
		setKeyboardOffset(0);
	};

	const handleChat = () => {
		const payload = {
			authorId: user.userId,
			type: imageInfo ? "Image" : "Text",
			content: imageInfo ? imageInfo.base64 : text,
			chatId,
			recipentId,
		};
		console.log(payload);
		socket.emit("handle_message", payload);

		setText("");
		setImageInfo(null);
		setInputActive(false);
	};

	useEffect(() => {
		// socket event to add message to the sending client's chat screen
		socket.on("chat_screen_message", (newMessage) => {
			const { authorId, content, date, type } = newMessage;

			setChats((chats) => [...chats, { authorId, date, content, type }]);
		});

		return () => {
			socket.removeAllListeners("chat_screen_message");
		};
	}, [focused]);

	useEffect(() => {
		(async () => {
			const { data } = await getChatMessages(chatId);

			setChats(data.reverse());

			// so that the screen only scrolls after all the contents have been loaded.
			setFirstLoad(true);
		})();
	}, []);

	// scroll to bottom of chat by default
	useEffect(() => {
		if (!scrollViewRef.current || !firstLoad) return;

		scrollViewRef.current.scrollToEnd({ animated: false });
	}, [scrollViewRef, chats, firstLoad]);

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
		Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

		return () => {
			Keyboard.removeAllListeners("keyboardDidShow");
			Keyboard.removeAllListeners("keyboardDidHide");
		};
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ChatHeader chatId={chatId} messageWith={messageWith} />

			<ScrollView ref={scrollViewRef} style={{ marginBottom: 50 }}>
				<View style={{ marginTop: 10, paddingBottom: keyboardOffset }}>
					{chats.map((chat: ChatBubbleType, index: number) => {
						// check if the last message was sent by the same user, so that only one avatar is displayed.
						const sameUser: boolean =
							index - 1 >= 0 &&
							chats[index].authorId === chats[index - 1].authorId;

						return (
							<ChatBubble
								key={index}
								chat={chat}
								sameUser={sameUser}
								profilePicture={profilePicture}
							/>
						);
					})}
				</View>
			</ScrollView>

			<ChatInput
				text={text}
				setText={setText}
				keyboardOffset={keyboardOffset}
				handleChat={handleChat}
				imageInfo={imageInfo}
				setImageInfo={setImageInfo}
				inputActive={inputActive}
				setInputActive={setInputActive}
			/>
		</View>
	);
};

export default ChatScreen;
