import { analyzeMessageIntent, reportSymptomSimilarity } from "../../API/api";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";

export interface ChatbotReplyType {
	chat: ChatBubbleType;
	symptomValue?: number;
}

const getSimilarSymptom = async (symptom: string) => {
	const response = await reportSymptomSimilarity(symptom);

	if (response.ok) {
		return response.symptom;
	}

	return null;
};

export const analyzeUserText = async (
	text: string
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

	if (!response?.data) {
		chatBotReply.content =
			"Sorry, the chatbot is inactive right now. Please try again later.";
		return { chat: chatBotReply };
	}

	let { intent } = response.data;
	intent = intent.toLowerCase();

	if (intent === "greetings.hello" || intent === "greetings.bye") {
		chatBotReply.content = response.data.answer;
		return { chat: chatBotReply };
	}

	if (intent === "symptom" || intent === "none") {
		const {
			data: { keywords },
		} = await retext().use(retextPos).use(retextKeywords).process(text);

		let symptomName = text;

		console.log(keywords);

		if (Array.isArray(keywords) && keywords.length > 0) {
			symptomName = keywords[0].stem;
		}

		const similarSymptom = await getSimilarSymptom(symptomName);
		if (!similarSymptom) {
			chatBotReply.content =
				"Sorry, I couldn't make that up, could you please repeat that differently?";
			return { chat: chatBotReply };
		}

		chatBotReply.content = `Okay, so you have shown the following symptom: ${similarSymptom.Name}`;
		return { chat: chatBotReply, symptomValue: similarSymptom.ID };
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