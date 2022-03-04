import { analyzeMessageIntent, reportSymptomSimilarity } from "../../API/api";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";

const GREETINGS_HELLO = "greetings.hello";
const GREETINGS_BYE = "greetings.bye";
const INTENT_NONE = "none";
const INTENT_SYMPTOM = "symptom";
const REACTION_POSITIVE = "reaction.positive";
const REACTION_NEGATIVE = "reaction.negative";

class ChatBot {
	currentSymptoms = {};
	currentConversation: {};

	chatBotReply: ChatBubbleType = {
		authorId: "chatbot",
		content: "",
		date: new Date().toString(),
		type: "Text",
		name: "",
	};

	resetChatbotConvo(): void {
		this.currentSymptoms = {};
		this.currentConversation = {};
		this.chatBotReply.content = "";
		this.chatBotReply.question = false;
	}

	async getSymptomName(symptom: string): Promise<any> {
		const response = await reportSymptomSimilarity(symptom);

		if (response.ok) {
			return response.symptom;
		}

		return null;
	}

	// for when user answers with yes/no question or something??
	async registerUserReply(answer: boolean) {}

	async formReply(symptom: string): Promise<ChatBubbleType> {
		// check if only one symptom is registered, if it is, ask for one more symptom.
		if (Object.keys(this.currentSymptoms).length < 2) {
			this.chatBotReply.content = `So, you said you have the following symptom: ${symptom}. Could you list out one more symptom?`;
			return Object.assign({}, this.chatBotReply);
		}

		// API call to get similar symptom here.
		this.chatBotReply.question = true;
		this.chatBotReply.content = this.getQuestionedReply().reply;
		return Object.assign({}, this.chatBotReply);
	}

	async analyzeUserText(text: string): Promise<ChatBubbleType> {
		// get the user intent
		const response = await analyzeMessageIntent(text);

		if (!response?.data) {
			this.chatBotReply.content =
				"Sorry, the chatbot is inactive right now. Please try again later.";

			return Object.assign({}, this.chatBotReply);
		}

		let { intent } = response.data;
		intent = intent.toLowerCase();

		if (intent === GREETINGS_HELLO || intent === GREETINGS_BYE) {
			// reset symptoms if the intent is bye
			if (intent === GREETINGS_BYE) this.resetChatbotConvo();

			this.chatBotReply.content = response.data.answer;
			return Object.assign({}, this.chatBotReply);
		}

		// symptom analysis start here
		if (intent === INTENT_SYMPTOM || intent === INTENT_NONE) {
			const {
				data: { keywords },
			} = await retext().use(retextPos).use(retextKeywords).process(text);

			// if a keyword is not detected because of one word input like "cough", just pass in the input directly
			let symptomName = text;

			if (Array.isArray(keywords) && keywords.length > 0) {
				symptomName = keywords[0].stem;
			}

			const similarSymptom = await this.getSymptomName(symptomName);
			if (!similarSymptom) {
				this.chatBotReply.content =
					"Sorry, I couldn't match understand the symptom, could you please try again?";
				return Object.assign({}, this.chatBotReply);
			}

			// add the symptom information to instance variables
			// this information will be used to get similar symptoms/ gather final diagnosis
			this.currentSymptoms[similarSymptom.ID] = similarSymptom.Name;

			return await this.formReply(similarSymptom.Name);
		}

		this.chatBotReply.content = intent;
		return Object.assign({}, this.chatBotReply);
	}

	getQuestionedReply = (): {
		reply: string;
	} => {
		const symptoms = Object.values(this.currentSymptoms);

		return {
			reply: `Symptoms so far: ${symptoms.join(
				", "
			)}. Do you also have x sickness?`,
		};
	};
}

export default ChatBot;
