import { analyzeMessageIntent } from "../../API/api";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";

export interface ChatbotReplyType {
	chat: ChatBubbleType;
	symptomValue?: number;
}

export const analyzeUserText = async (
	text: string,
	previousSymptoms: number[]
): Promise<ChatbotReplyType> => {
	// find intent here,

	const chatBotReply: ChatBubbleType = {
		authorId: "chatbot",
		content: "",
		date: new Date().toString(),
		type: "Text",
		name: "",
	};

	const response = await analyzeMessageIntent(text);
	console.log(response);
	if (!response?.data) {
		chatBotReply.content =
			"Sorry, the chatbot is inactive right now. Please try again later.";
		return { chat: chatBotReply };
	}

	const { intent } = response.data;

	if (intent.toLowerCase() === "none") {
		chatBotReply.content = "Sorry, could you please repeat that.";
		return { chat: chatBotReply };
	}

	if (intent === "greetings.hello" || intent === "greetings.bye") {
		chatBotReply.content = response.data.answer;
		return { chat: chatBotReply };
	}

	if (intent === "symptom") {
		const {
			data: { keywords },
		} = await retext().use(retextPos).use(retextKeywords).process(text);

		chatBotReply.content = `Okay, so you said you have ${keywords[0].stem}`;
		return { chat: chatBotReply };
	}

	chatBotReply.content = intent;
	return { chat: chatBotReply };

	/*
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
	*/
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
