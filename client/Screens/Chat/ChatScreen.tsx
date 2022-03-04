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
	name: string;
	question?: boolean;
};

export interface ImagePreviewType {
	base64: string;
	uri: string;
	fileName: string;
}

export interface FilePreviewType {
	base64: string;
	fileName: string;
	fileExtension: string;
}

const ChatScreen = ({ route }) => {
	const {
		applicationReducer: { socket, chatBot },
		userReducer: { user },
	} = useSelector((state: RootStore) => state);

	const { chatId, messageWith, profilePicture, recipentId, chatbot } =
		route.params;

	const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

	const [firstLoad, setFirstLoad] = useState<boolean>(false);

	const [chats, setChats] = useState<ChatBubbleType[]>([]);
	const [text, setText] = useState<string>("");

	const [imageInfo, setImageInfo] = useState<ImagePreviewType | null>(null);
	const [fileInfo, setFileInfo] = useState<FilePreviewType | null>(null);

	const [inputActive, setInputActive] = useState<boolean>(false);

	const focused = useIsFocused();
	const scrollViewRef = useRef(null);

	const handleKeyboardShow = (e: any) => {
		setKeyboardOffset(e.endCoordinates.height);
	};

	const handleKeyboardHide = () => {
		setKeyboardOffset(0);
	};

	const resetVales = () => {
		setText("");
		setImageInfo(null);
		setInputActive(false);
	};

	const handleChat = () => {
		const type = fileInfo ? "File" : imageInfo ? "Image" : "Text";
		const content = fileInfo
			? fileInfo.base64
			: imageInfo
			? imageInfo.base64
			: text;
		const name = fileInfo
			? fileInfo.fileName
			: imageInfo
			? imageInfo.fileName
			: "";

		const payload = {
			authorId: user.userId,
			type,
			content,
			chatId,
			recipentId,
			fileExtension: fileInfo?.fileExtension || null,
			name,
		};
		socket.emit("handle_message", payload);

		resetVales();
	};

	useEffect(() => {
		// socket event to add message to the sending client's chat screen
		socket.on("chat_screen_message", (newMessage) => {
			const { authorId, content, date, type, name } = newMessage;

			setChats((chats) => [
				...chats,
				{ authorId, date, content, type, name },
			]);
		});

		return () => {
			socket.removeAllListeners("chat_screen_message");
		};
	}, [focused]);

	useEffect(() => {
		// don't load older messages for now in case it's a chatbot (haven't configured db for that yet.)
		if (chatbot) return;

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

	// for chatbot related things
	const analyzeChat = async () => {
		const userChat = {
			authorId: user.userId,
			content: text,
			date: new Date().toString(),
			type: "Text",
			name: "",
		};

		const chat = await chatBot.analyzeUserText(text);
		setChats((chats) => [...chats, userChat, chat]);

		resetVales();
	};

	return (
		<View style={styles.fullContainer}>
			<ChatHeader
				chatbot={chatbot}
				chatId={chatId}
				messageWith={messageWith}
			/>

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
								respondLastAsked={() => {}}
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
				fileInfo={fileInfo}
				setFileInfo={setFileInfo}
				chatbot={chatbot}
				analyzeChat={analyzeChat}
			/>
		</View>
	);
};

export default ChatScreen;
