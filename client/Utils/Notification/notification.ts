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
	try {
		PushNotification.createChannel(
			{ channelId: "scheduleChannel", channelName: "Schedule Channel" },
			() => {
				console.log("Channel created.");
			}
		);
	} catch (error) {
		console.log(error);
	}
};

// TODO:
// find a better solution for stopping previous background tasks
export const handleScheduling = async () => {
	await new Promise<void>(async () => {
		// cancel all the old jobs before registering new ones
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
				console.log(schedule.hour, schedule.minutes);

				for (let day of weekDays) {
					const newJob = NodeSchedule.scheduleJob(
						`${schedule.minutes} ${
							schedule.hour == 24 ? 0 : schedule.hour
						} * * ${day}`,
						() => {
							handleNotification(
								`Reminder: ${medicine.name}`,
								`Hi, this is a reminder for you to take ${medicine.name}.`
							);
						}
					);
					console.log(newJob);

					if (newJob) {
						currentJobs.push(newJob);
					}
				}
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
