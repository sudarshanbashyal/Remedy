import {
	analyzeMessageIntent,
	getDiagnosis,
	getSimilarSymptoms,
	reportSymptomSimilarity,
} from "../../API/api";
import { ChatBubbleType } from "../../Screens/Chat/ChatScreen";
import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { Store } from "../../Redux/store";

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

const {
	userReducer: {
		user: { dob, gender },
	},
} = Store.getState();

class ChatBot {
	currentSymptoms = {};
	currentConversation: ChatbotConversationType = {
		conversationType: CONVERSATION_START,
		symptomQuestion: null,
	};
	rejectedSymptoms = {};
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
		return { ...this.chatBotReply };
	}

	async analyzeSimilarSymptoms(): Promise<any> {
		const symptomsArray: number[] = Object.keys(this.currentSymptoms).map(
			(symId: string) => +symId
		);

		const data = await getSimilarSymptoms(
			symptomsArray,
			new Date(dob).getFullYear(),
			gender
		);

		if (data.ok) {
			// suggest similar symptoms
			this.proposedSymptoms = data.proposedData;

			// ask question about the symptom
			this.setPropsedSymptomQuestion();
		}
	}

	// for when user answers with yes/no question or something??
	async registerUserReply(intent: string) {
		if (this.currentConversation.symptomQuestion) {
			const reaction: boolean =
				intent === REACTION_POSITIVE ? true : false;

			if (reaction) {
				await this.handlePositiveIntent();
				return;
			}

			await this.handleNegativeIntent();
		}
	}

	async handleNegativeIntent() {
		// if the intent is negative i.e. user didn't suffer from the suggested symptom, loop through other proposed symptom
		// add symptom in question to rejected list, and cycle through other proposed symptoms

		const { symptomValue, symptomName } =
			this.currentConversation.symptomQuestion;

		this.rejectedSymptoms[symptomValue] = symptomName;

		this.setPropsedSymptomQuestion();
	}

	async handlePositiveIntent() {
		// if the intent to the question was positive, add the current symptom in question to current symptom list
		// and then, look for other related symptoms
		const { symptomValue, symptomName } =
			this.currentConversation.symptomQuestion;
		this.currentSymptoms[symptomValue] = symptomName;

		// if the number of current symptoms is more than or equals to three provide diagnosis, else ask more questions
		if (Object.keys(this.currentSymptoms).length >= 3) {
			await this.provideDiagnosis();
			return;
		}

		// ask question again
		await this.analyzeSimilarSymptoms();
	}

	setPropsedSymptomQuestion = () => {
		for (let symptom of this.proposedSymptoms) {
			if (
				!this.rejectedSymptoms[symptom.ID] &&
				!this.currentSymptoms[symptom.ID]
			) {
				this.currentConversation = {
					conversationType: CONVERSATION_SYMPTOM,
					symptomQuestion: {
						symptomName: symptom.Name,
						symptomValue: symptom.ID,
					},
				};

				// write content
				const { reply } = this.getQuestionedReply(symptom.Name);
				this.chatBotReply.content = reply;
				this.chatBotReply.question = true;

				return;
			}
		}

		// edge case: user doesn't suffer from any of the propsed symptoms.
		// Provide the diagnosis here
		this.provideDiagnosis();
	};

	async provideDiagnosis() {
		this.currentConversation.symptomQuestion = null;

		const symptomsArray: number[] = Object.keys(this.currentSymptoms).map(
			(symId: string) => +symId
		);

		const data = await getDiagnosis(
			symptomsArray,
			new Date(dob).getFullYear(),
			gender
		);

		if (!data.ok) {
			this.chatBotReply.content =
				"I couldn't diagnose your symptom =( Please talk to your doctor.";
		}

		const { proposedData } = data;

		const diagnosisDetails = proposedData[0].Issue;
		const { Name, ProfName } = diagnosisDetails;

		this.chatBotReply.question = false;
		this.chatBotReply.content = `I diagnose you with ${Name}, also known as ${ProfName}.\n Here are some medications you may want to try:`;
	}

	async formInitialReply(symptom: string = ""): Promise<ChatBubbleType> {
		// check if only one symptom is registered, if it is, ask for one more symptom.
		if (Object.keys(this.currentSymptoms).length < 2) {
			this.chatBotReply.content = `So, you said you have the following symptom: ${symptom}. Could you list out one more symptom?`;

			return this.replyToUser();
		}

		// suggest similar symptom according to the currentSymptomsArray
		await this.analyzeSimilarSymptoms();

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
			await this.registerUserReply(intent);
			return this.replyToUser();
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

			const fullSymptomName = await this.getSymptomName(symptomName);
			if (!fullSymptomName) {
				this.chatBotReply.content =
					"Sorry, I couldn't understand the symptom, could you please try again?";
				return this.replyToUser();
			}

			// add the symptom information to instance variables
			// this information will be used to get similar symptoms/ gather final diagnosis
			this.currentSymptoms[fullSymptomName.ID] = fullSymptomName.Name;

			return await this.formInitialReply(fullSymptomName.Name);
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
			)}. Are you also experiencing: ${symptom}?`,
		};
	};
}

export default ChatBot;
