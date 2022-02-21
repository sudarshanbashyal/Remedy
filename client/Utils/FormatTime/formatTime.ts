import moment from "moment";

export const formatFullDate = (date: Date) => {
	return moment(date).format("MMM Do YYYY");
};

export const formatShortDate = (date: Date) => {
	return moment(date).format("MMM Do");
};

export const formatMessageTime = (date: Date) => {
	return "Now";
};
