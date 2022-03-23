import { getMessageList } from "../../API/api";
import { formatText } from "../FormatText/formatText";

export const getChatPreviews = async (userId: string): Promise<any> => {
	const allChats = [];
	const { data } = await getMessageList();

	data.forEach((preview: any) => {
		allChats.push({
			chatId: preview.chatId,
			messageWith:
				preview.secondParticipant.userId === userId
					? preview.firstParticipant.firstName +
					  " " +
					  preview.firstParticipant.lastName
					: preview.secondParticipant.firstName +
					  " " +
					  preview.secondParticipant.lastName,
			userIcon:
				preview.secondParticipant.userId === userId
					? preview.firstParticipant.profilePicture
					: preview.secondParticipant.profilePicture,
			lastMessage: formatText(preview.messages[0].content, 32),
			messageTime: preview.messages[0].date,
			recipentId:
				preview.firstParticipant.userId === userId
					? preview.secondParticipant.userId
					: preview.firstParticipant.userId,
			type: preview.messages[0].type,
			chatBot: false,
		});
	});

	return allChats;
};
