import { analyzeMessageIntent, reportSymptomSimilarity } from "../../API/api";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";

export interface ChatbotReplyType {
	chat: ChatBubbleType;
	symptomValue?: number;
}

const GREETINGS_HELLO = "greetings.hello";
const GREETINGS_BYE = "greetings.bye";
const INTENT_NONE = "none";
const INTENT_SYMPTOM = "symptom";
const REACTION_POSITIVE = "reaction.positive";
const REACTION_NEGATIVE = "reaction.negative";

class ChatBot {
	currentSymptoms: {};
	currentConversation: {};

	resetChatbotConvo(): void {
		this.currentSymptoms = {};
		this.currentConversation = {};
	}

	async getSymptomName(symptom: string): Promise<any> {
		const response = await reportSymptomSimilarity(symptom);

		if (response.ok) {
			return response.symptom;
		}

		return null;
	}

	async analyzeUserText(text: string): Promise<ChatbotReplyType> {
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

		if (intent === GREETINGS_HELLO || intent === GREETINGS_BYE) {
			if (intent === GREETINGS_BYE) this.resetChatbotConvo();

			chatBotReply.content = response.data.answer;
			return { chat: chatBotReply };
		}

		if (intent === INTENT_SYMPTOM || intent === INTENT_NONE) {
			const {
				data: { keywords },
			} = await retext().use(retextPos).use(retextKeywords).process(text);

			let symptomName = text;

			if (Array.isArray(keywords) && keywords.length > 0) {
				symptomName = keywords[0].stem;
			}

			const similarSymptom = await this.getSymptomName(symptomName);
			if (!similarSymptom) {
				chatBotReply.content =
					"Sorry, I couldn't match understand the symptom, could you please try again?";
				return { chat: chatBotReply };
			}

			chatBotReply.content = `Okay, so you have shown the following symptom: ${similarSymptom.Name}`;
			return { chat: chatBotReply, symptomValue: similarSymptom.ID };
		}

		chatBotReply.content = intent;
		return { chat: chatBotReply };

		/*

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
	}

	getReply = (): {
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
}

export default ChatBot;
