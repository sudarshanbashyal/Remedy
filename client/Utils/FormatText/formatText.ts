export const formatText = (message: string, limit: number): string => {
	if (message.length <= 20) return message;

	const formattedMessage = message.slice(0, limit).concat("...");

	return formattedMessage;
};

export const replaceSnakeCase = (text: string) => {
	return text.replace(/_/g, " ");
};
