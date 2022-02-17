import NodeSchedule from "node-schedule";
import PushNotification from "react-native-push-notification";
import {
	MedicineType,
	ScheduleType,
} from "../../Redux/Actions/UserActionTypes";
import EventEmitter from "events";
import { Store } from "../../Redux/store";

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

export const eventEmitter = new EventEmitter();

export const stopScheduling = async () => {
	eventEmitter.emit("close");
};

// TODO:
// find a better algorithm for this function
// find a better solution for stopping previous background tasks
export const handleScheduling = async ({
	medicines,
}: {
	medicines: MedicineType[];
}) => {
	await new Promise<void>(async (resolve) => {
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
								`Hi, this is a reminder for you to take ${medicine.name}.`,
								medicine.medicineId
							);
						}
					);
				});
			});
		}
	});
};

export const createChannel = () => {
	PushNotification.createChannel(
		{ channelId: "scheduleChannel", channelName: "Schedule Channel" },
		() => {
			console.log("Channel created.");
		}
	);
};

export const handleNotification = (
	title: string,
	message: string,
	medicineId: string
) => {
	const { userReducer } = Store.getState();

	const currentHour = new Date().getHours();
	const currentMinutes = new Date().getMinutes();

	let correctTime = false;
	let currentMedicine: MedicineType = null;

	userReducer.user.medicines.forEach((medicine: MedicineType) => {
		if (medicine.medicineId === medicineId) {
			currentMedicine = medicine;
			return;
		}
	});

	currentMedicine.schedules.forEach((schedule: ScheduleType) => {
		if (
			schedule.minutes === currentMinutes &&
			schedule.hour === currentHour
		) {
			correctTime = true;
			return;
		}
	});

	if (!correctTime) return;

	PushNotification.localNotification({
		channelId: "scheduleChannel",
		title,
		message,
		allowWhileIdle: true,
		playSound: true,
	});
};
