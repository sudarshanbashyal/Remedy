import {
	analyzeMessageIntent,
	getSimilarSymptoms,
	reportSymptomSimilarity,
} from "../../API/api";
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

const CONVERSATION_START = "conversation.start";
const CONVERSATION_END = "conversation.end";
const CONVERSATION_SYMPTOM = "conversation.symptom";

interface ChatbotConversationType {
	conversationType:
		| typeof CONVERSATION_START
		| typeof CONVERSATION_END
		| typeof CONVERSATION_SYMPTOM;
	symptomQuestion?: {
		symptomName: string;
		symptomValue: number;
	} | null;
}

class ChatBot {
	currentSymptoms = {};
	currentConversation: ChatbotConversationType = {
		conversationType: CONVERSATION_START,
		symptomQuestion: null,
	};
	rejectedSymptoms = [];
	proposedSymptoms: { Name: string; ID: number }[] = [];

	chatBotReply: ChatBubbleType = {
		authorId: "chatbot",
		content: "",
		date: new Date().toString(),
		type: "Text",
		name: "",
	};

	resetChatbotConvo(): void {
		this.currentSymptoms = {};
		this.currentConversation = { conversationType: CONVERSATION_START };
		this.chatBotReply.content = "";
		this.chatBotReply.question = false;
		this.rejectedSymptoms = [];
		this.proposedSymptoms = [];
	}

	async getSymptomName(symptom: string): Promise<any> {
		const response = await reportSymptomSimilarity(symptom);

		if (response.ok) {
			return response.symptom;
		}

		return null;
	}

	replyToUser(): ChatBubbleType {
		return Object.assign({}, this.chatBotReply);
	}

	async getSimilarSymptom(): Promise<any> {
		const symptomIDs = Object.keys(this.currentSymptoms).map(
			(id: string) => +id
		);
		const { data } = await getSimilarSymptoms(symptomIDs);
		console.log(data);
		this.currentSymptoms = data;
	}

	// for when user answers with yes/no question or something??
	async registerUserReply(answer: boolean) {
		if (answer) {
			const { symptomName, symptomValue } =
				this.currentConversation.symptomQuestion;
			this.currentSymptoms[symptomValue] = symptomName;
			return await this.formReply();
		}

		// add current symptom to rejected symptoms so they are not displayed again.
		this.rejectedSymptoms.push(
			this.currentConversation.symptomQuestion.symptomValue
		);

		// remove question from conversation
		this.currentConversation.symptomQuestion = null;

		// ask user about another similar symptom
		return await this.formReply(this.proposedSymptoms[0].Name);
	}

	async formReply(symptom: string = ""): Promise<ChatBubbleType> {
		// check if only one symptom is registered, if it is, ask for one more symptom.
		if (Object.keys(this.currentSymptoms).length < 2) {
			this.chatBotReply.content = `So, you said you have the following symptom: ${symptom}. Could you list out one more symptom?`;
			return this.replyToUser();
		}

		if (Object.keys(this.currentSymptoms).length >= 5) {
			this.chatBotReply.content = "Okay, that's enough symptoms bro.";
			return this.replyToUser();
		}

		// API call to get similar symptom here.
		// register the new symptom in current conversation object.
		// when the user answers with positive or negative intent, registerUserReply() will be called, and the symptom will either be added to currentSymptoms or discarded
		await this.getSimilarSymptom();

		this.currentConversation.symptomQuestion = {
			symptomName: this.proposedSymptoms[0].Name,
			symptomValue: this.proposedSymptoms[0].ID,
		};

		// ask question about the new symptom
		this.chatBotReply.question = true;
		this.chatBotReply.content = this.getQuestionedReply(
			this.currentConversation.symptomQuestion.symptomName
		).reply;

		return this.replyToUser();
	}

	async analyzeUserText(text: string): Promise<ChatBubbleType> {
		// get the user intent
		const response = await analyzeMessageIntent(text);

		if (!response?.data) {
			this.chatBotReply.content =
				"Sorry, the chatbot is inactive right now. Please try again later.";

			return this.replyToUser();
		}

		let { intent } = response.data;
		intent = intent.toLowerCase();

		if (intent === GREETINGS_HELLO || intent === GREETINGS_BYE) {
			// reset symptoms if the intent is bye
			if (intent === GREETINGS_BYE) this.resetChatbotConvo();

			this.chatBotReply.content = response.data.answer;
			return this.replyToUser();
		}

		if (intent === REACTION_POSITIVE || intent === REACTION_NEGATIVE) {
			if (this.currentConversation.symptomQuestion) {
				const reaction: boolean =
					intent === REACTION_POSITIVE ? true : false;

				return await this.registerUserReply(reaction);
			}
		}

		// symptom analysis start here
		if (intent === INTENT_SYMPTOM || intent === INTENT_NONE) {
			// if question asked by the chatbot is active, ask user to answer the question first
			if (this.currentConversation.symptomQuestion) {
				this.chatBotReply.content =
					"Please, answer the above question before continuing.";
				return this.replyToUser();
			}

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
				return this.replyToUser();
			}

			// add the symptom information to instance variables
			// this information will be used to get similar symptoms/ gather final diagnosis
			this.currentSymptoms[similarSymptom.ID] = similarSymptom.Name;

			return await this.formReply(similarSymptom.Name);
		}

		this.chatBotReply.content = intent;
		return this.replyToUser();
	}

	getQuestionedReply = (
		symptom: string
	): {
		reply: string;
	} => {
		const symptoms = Object.values(this.currentSymptoms);

		return {
			reply: `Symptoms so far: ${symptoms.join(
				", "
			)}. Are you also experiencing ${symptom}?`,
		};
	};
}

export default ChatBot;
