import moment, { unitOfTime } from "moment";

export const formatFullDate = (date: Date) => {
	return moment(date).format("MMM Do YYYY");
};

export const formatShortDate = (date: Date) => {
	return moment(date).format("MMM Do");
};

export const formatHourTime = (date: Date) => {
	return moment(date).format("hh:mm A");
};

export const formatDayTime = (date: Date) => {
	return moment(date).format("dd hh:mm A");
};

export const formatMonthTime = (date: Date) => {
	return moment(date).format("MMM hh:mm A");
};

export const formatMessageTime = (date: Date): string => {
	const currentDate = moment();
	const messageDate = moment(date);

	let diffTimes = {
		minutes: null,
		hours: null,
		days: null,
		weeks: null,
		months: null,
		years: null,
	};
	const diffUnits: unitOfTime.Diff[] = [
		"minutes",
		"hours",
		"days",
		"weeks",
		"months",
		"years",
	];

	diffUnits.forEach((time: unitOfTime.Diff) => {
		diffTimes[time] = currentDate.diff(messageDate, time);
	});

	if (diffTimes.minutes < 1) return "<1 min";
	if (diffTimes.hours < 1) return diffTimes.minutes + " min";
	if (diffTimes.days < 1) return formatHourTime(date);
	if (diffTimes.weeks < 1) return formatDayTime(date);
	if (diffTimes.months < 12) return formatMonthTime(date);
	if (diffTimes.years < 1) return formatShortDate(date);
};

export const getDayDifference = (date: Date): number => {
	return moment().diff(moment(date), "days");
};
