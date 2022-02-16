export const formatName = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/\.\s*([a-z])|^[a-z]/gm, (s) => s.toUpperCase());
};
