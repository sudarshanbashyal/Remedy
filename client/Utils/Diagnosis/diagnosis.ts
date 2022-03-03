import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";

export interface ChatbotReplyType {
	chat: ChatBubbleType;
	symptomValue?: number;
}

export const analyzeUserText = (
	text: string,
	previousSymptoms: number[]
): ChatbotReplyType => {
	// find intent here,
	//
	//
	// get the question

	const { reply, question, symptomValue } = getReply();

	const chatBotReply: ChatBubbleType = {
		authorId: "chatbot",
		content: reply,
		date: new Date().toString(),
		type: "Text",
		name: "",
		question,
	};

	if (!symptomValue) return { chat: chatBotReply };

	return { chat: chatBotReply, symptomValue };
};

const getReply = (): {
	reply: string;
	question: boolean;
	symptomValue?: number;
} => {
	return {
		reply: "Dabidabi doop? dabi dbbipoop??",
		question: true,
		symptomValue: 10,
	};
};

export const displayUnansweredWarning = (): ChatBubbleType => {
	return {
		authorId: "chatbot",
		content: "Please answer the previous question.",
		date: new Date().toString(),
		type: "Text",
		name: "",
	};
};
