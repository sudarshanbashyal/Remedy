import moment from "moment";

export const formatShortDate = (date: Date) => {
	return moment(date).format("MMM Do YYYY");
};
