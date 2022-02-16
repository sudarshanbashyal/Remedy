import schedule from "node-schedule";
import PushNotification from "react-native-push-notification";

export const createChannel = () => {
	PushNotification.createChannel(
		{ channelId: "test-channel", channelName: "channel name" },
		() => {
			console.log("channel created");
		}
	);
};

export const handleSchedule = () => {
	schedule.scheduleJob("58 * * * *", () => {
		console.log("some notification");
		handleNotification();
	});
};

export const handleNotification = () => {
	PushNotification.localNotification({
		channelId: "test-channel",
		title: "Notification Title",
		message: "bg notification thing.",
		allowWhileIdle: true,
		playSound: true,
	});
};
