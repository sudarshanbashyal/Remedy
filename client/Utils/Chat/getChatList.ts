import { makeApiCall } from "../../API/api";
import { GET_MESSAGE_LIST, HTTP_GET } from "../../API/apiTypes";
import { formatText } from "../FormatText/formatText";
import { showToast } from "../Toast";

export const getChatPreviews = async (userId: string): Promise<any> => {
	const allChats = [];

	const apiResponse = await makeApiCall({
		endpoint: GET_MESSAGE_LIST,
		httpAction: HTTP_GET,
		auth: true,
	});

	if (!apiResponse.ok) {
		showToast("error", "Couldn't retrieve message list.");
		return allChats;
	}

	const { data } = apiResponse;

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
			lastMessage:
				(preview.messages[0] &&
					formatText(preview.messages[0]?.content, 32)) ||
				"No Messages Yet.",
			messageTime: preview.messages[0]?.date || null,
			recipentId:
				preview.firstParticipant.userId === userId
					? preview.secondParticipant.userId
					: preview.firstParticipant.userId,
			type: preview.messages[0]?.type || "Text",
			chatBot: false,
		});
	});

	return allChats;
};
