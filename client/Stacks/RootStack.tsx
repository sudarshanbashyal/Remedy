import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerSocketAction } from "../Redux/Actions/ApplicationActions";
import { RootStore } from "../Redux/store";
import ChatList from "../Screens/Chat/ChatList";
import ChatMedia from "../Screens/Chat/ChatMedia";
import ChatScreen from "../Screens/Chat/ChatScreen";
import AccountSettings from "../Screens/Profile/AccountSettings";
import Profile from "../Screens/Profile/Profile";
import ProfileSettings from "../Screens/Profile/ProfileSettings";
import MedicineList from "../Screens/Schedule/MedicineList";
import ScheduleDetails from "../Screens/Schedule/ScheduleDetails";
import MedicineStats from "../Screens/Stats/MedicineStats";
import { showToast } from "../Utils/Toast";
import io, { Socket } from "socket.io-client";

export type RootStackType = {
	ChatList: any;
	ChatScreen: {
		chatId: string;
		messageWith: string;
		profilePicture: string;
		recipentId: string;
	};
	ScheduleDetails: {
		medicineId?: any;
	};
	ChatMedia: any;
	MedicineStats: any;
	MedicineList: any;
	Profile: any;
	ProfileSettings: any;
	AccountSettings: any;
};

const slideFromRightAnimation: NativeStackNavigationOptions = {
	animation: "slide_from_right",
};

const RootStack = () => {
	const Stack = createNativeStackNavigator();
	const dispatch = useDispatch();

	const {
		userReducer: { user },
		applicationReducer: { socket },
	} = useSelector((state: RootStore) => state);

	// connecting to the WSS server
	useEffect(() => {
		const socket: Socket<any> = io("http://192.168.1.66:3000");
		dispatch(registerSocketAction(socket));

		socket.emit("register_socket", user.userId);

		return () => {
			socket.emit("unregister_socket", user.userId);
			socket.disconnect();
			dispatch(registerSocketAction(null));
		};
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="ChatList" component={ChatList} />
			<Stack.Screen
				name="ChatScreen"
				options={slideFromRightAnimation}
				component={ChatScreen}
			/>
			<Stack.Screen
				name="ScheduleDetails"
				options={slideFromRightAnimation}
				component={ScheduleDetails}
			/>
			<Stack.Screen
				name="ChatMedia"
				options={slideFromRightAnimation}
				component={ChatMedia}
			/>
			<Stack.Screen name="MedicineStats" component={MedicineStats} />
			<Stack.Screen name="MedicineList" component={MedicineList} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen
				name="ProfileSettings"
				options={slideFromRightAnimation}
				component={ProfileSettings}
			/>
			<Stack.Screen
				name="AccountSettings"
				options={slideFromRightAnimation}
				component={AccountSettings}
			/>
		</Stack.Navigator>
	);
};

export default RootStack;
