import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Keyboard } from "react-native";
import styles from "../../Styles/styles";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatBubble from "../../Components/Chat/ChatBubble";
import ChatInput from "../../Components/Chat/ChatInput";
import { getChatMessages } from "../../API/api";

export type ChatBubbleType = {
	authorId: string;
	content: string;
	date: string;
};

const ChatScreen = ({ route }) => {
	const { chatId, messageWith, profilePicture } = route.params;

	const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

	const [chats, setChats] = useState<ChatBubbleType[]>([]);
	const [text, setText] = useState<string>("");

	const scrollViewRef = useRef(null);
	const handleKeyboardShow = (e: any) => {
		setKeyboardOffset(e.endCoordinates.height);
	};

	const handleKeyboardHide = () => {
		setKeyboardOffset(0);
	};

	const handleChat = () => {};

	/*
	useEffect(() => {
		const socket = new WebSocket("ws://192.168.1.66:3000");

		socket.onopen = () => {
			console.log("Connected to socket server");
		};

		return () => {
			socket.close();
		};
	}, []);
	*/

	useEffect(() => {
		(async () => {
			const { data } = await getChatMessages(chatId);

			setChats(data.reverse());
		})();
	}, []);

	// scroll to bottom of chat by default
	useEffect(() => {
		if (!scrollViewRef.current) return;

		scrollViewRef.current.scrollToEnd({ animated: true });
	}, [scrollViewRef]);

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
			/>
		</View>
	);
};

export default ChatScreen;
