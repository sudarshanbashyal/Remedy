import NodeSchedule from "node-schedule";
import PushNotification from "react-native-push-notification";
import BackgroundService from "react-native-background-actions";
import {
	MedicineType,
	ScheduleType,
} from "../../Redux/Actions/UserActionTypes";

export const bgoptions = {
	taskName: "Client Running",
	taskTitle: "Client Running in background",
	taskDesc: "Client  Descrption I guess?",
	taskIcon: {
		name: "ic_launcher",
		type: "mipmap",
	},
	color: "#ff00ff",
	linkingURI: "yourSchemeHere://chat/jane", // See Deep Linking for more info
	parameters: {},
};

export const stopScheduling = async () => {
	await BackgroundService.stop();
};

// TODO:
// find a better algorithm for this function
export const handleScheduling = async ({
	medicines,
}: {
	medicines: MedicineType[];
}) => {
	await new Promise(async (resolve) => {
		for (let medicine of medicines) {
			if (!medicine.active) continue;
			console.log("Medicine name:", medicine.name);

			const weekDays = medicine.days;

			medicine.schedules.forEach((schedule: ScheduleType) => {
				weekDays.forEach((day: number) => {
					NodeSchedule.scheduleJob(
						`${schedule.minutes} ${schedule.hour} * * ${day}`,
						() => {
							handleNotification(
								`Reminder: ${medicine.name}`,
								`Hi, this is a reminder for you to take ${medicine.name}.`
							);
						}
					);
				});
			});
		}
	});

	/*
	await new Promise(async (resolve) => {
		schedule.scheduleJob("04 * * * *", () => {
			console.log("some notification");
			handleNotification("Background Title", "Some message about text");
		});
	});
	*/
};

export const createChannel = () => {
	PushNotification.createChannel(
		{ channelId: "scheduleChannel", channelName: "Schedule Channel" },
		() => {
			console.log("Channel created.");
		}
	);
};

export const handleNotification = (title: string, message: string) => {
	PushNotification.localNotification({
		channelId: "scheduleChannel",
		title,
		message,
		allowWhileIdle: true,
		playSound: true,
	});
};
