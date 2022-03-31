import NodeSchedule from "node-schedule";
import PushNotification from "react-native-push-notification";
import { ScheduleType } from "../../Redux/Actions/UserActionTypes";
import EventEmitter from "events";
import { Store } from "../../Redux/store";

export const bgoptions = {
	taskName: "Client Running",
	taskTitle: "Client Running in Background.",
	taskDesc: "",
	taskIcon: {
		name: "ic_launcher",
		type: "mipmap",
	},
	color: "#ff00ff",
	linkingURI: "yourSchemeHere://chat/jane", // See Deep Linking for more info
	parameters: {},
};

export const eventEmitter = new EventEmitter();

export const stopScheduling = async () => {
	eventEmitter.emit("close");
};

let currentJobs = [];

export const createChannel = () => {
	PushNotification.createChannel(
		{ channelId: "scheduleChannel", channelName: "Schedule Channel" },
		() => {
			console.log("Channel created.");
		}
	);
};

// TODO:
// find a better solution for stopping previous background tasks
export const handleScheduling = async () => {
	await new Promise<void>(async (resolve) => {
		eventEmitter.on("close", () => {
			currentJobs.forEach((job: NodeSchedule.Job) => {
				job.cancel();
			});

			currentJobs = [];
		});

		const { userReducer } = Store.getState();
		const { medicines } = userReducer.user;

		for (let medicine of medicines) {
			if (!medicine.active) continue;

			const weekDays = medicine.days;

			medicine.schedules.forEach((schedule: ScheduleType) => {
				weekDays.forEach((day: number) => {
					currentJobs.push(
						NodeSchedule.scheduleJob(
							`${schedule.minutes} ${schedule.hour} * * ${day}`,
							() => {
								handleNotification(
									`Reminder: ${medicine.name}`,
									`Hi, this is a reminder for you to take ${medicine.name}.`
								);
							}
						)
					);
				});
			});
		}
	});
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
