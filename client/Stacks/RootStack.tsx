import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	registerSocketAction,
	registerChatbotAction,
} from "../Redux/Actions/ApplicationActions";
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
import io, { Socket } from "socket.io-client";
import { API_URL } from "../API/api";
import RequestScreen from "../Screens/Chat/RequestScreen";
import IntakeRegister from "../Screens/Schedule/IntakeRegister";
import SpecializedMaps from "../Screens/Map/SpecializedMaps";
import MedicalReference from "../Screens/MedicalReference/MedicalReference";
import ReferenceDetails from "../Screens/MedicalReference/ReferenceDetails";
import IncomingCall from "../Screens/RTC/IncomingCall";
import OutgoingCall from "../Screens/RTC/OutgoingCall";
import OngoingCall from "../Screens/RTC/OngoingCall";

import { Voximplant } from "react-native-voximplant";
import { VOXIMPLANT_APP_NAME, VOXIMPLANT_USER_PASSWORD } from "../Utils/keys";

export type RootStackType = {
	ChatList: any;
	ChatScreen: {
		chatId: string;
		messageWith: string;
		profilePicture: string;
		recipentId: string;
		chatbot: boolean;
	};
	ScheduleDetails: {
		medicineId?: any;
	};
	ChatMedia: {
		chatId: string;
	};
	MedicineStats: any;
	MedicineList: any;
	Profile: any;
	ProfileSettings: any;
	AccountSettings: any;
	RequestScreen: any;
	IntakeRegister: any;
	SpecializedMaps: {
		hospitals: any;
		category: any;
	};
	MedicalReference: any;
	ReferenceDetails: {
		genericName: string;
		rxcui: number | null;
		raw: any;
	};
	IncomingCall: {
		call: any;
	};
	OutgoingCall: {
		call?: any;
		isIncomingCall?: boolean;
		username?: string;
		fullName?: string;
	};
	OngoingCall: {
		call: any;
		isIncomingCall: boolean;
	};
};

const slideFromRightAnimation: NativeStackNavigationOptions = {
	animation: "slide_from_right",
};

const RootStack = () => {
	const Stack = createNativeStackNavigator();
	const dispatch = useDispatch();

	//
	const {
		userReducer: { user },
	} = useSelector((state: RootStore) => state);

	// connect to voximplant
	const [voximplant, setVoximplant] = useState<any>(Voximplant.getInstance());
	const [voxStateChanged, setVoxStateChanged] = useState<boolean>(false);

	useEffect(() => {
		const connect = async () => {
			const status = await voximplant.getClientState();

			if (status === "connected") {
				await signInToVoximplant();
			}

			if (status === Voximplant.ClientState.DISCONNECTED) {
				await voximplant.connect();
				setVoxStateChanged(!voxStateChanged);
			}
		};

		connect();
	}, [voximplant, user, voxStateChanged]);

	const signInToVoximplant = async () => {
		try {
			const voximplantusername =
				user.voximplantUsername + VOXIMPLANT_APP_NAME;

			const loginResult = await voximplant.login(
				voximplantusername,
				VOXIMPLANT_USER_PASSWORD
			);

			console.log("logged in: ", loginResult);
		} catch (error) {
			console.error("Voximplant Error Log:");
			console.error(error);
		}
	};

	// register a chatbot
	useEffect(() => {
		dispatch(registerChatbotAction());
	}, []);

	// connecting to the WSS server
	useEffect(() => {
		const socket: Socket<any> = io(API_URL);
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

			<Stack.Screen name="IntakeRegister" component={IntakeRegister} />

			<Stack.Screen name="MedicineStats" component={MedicineStats} />

			<Stack.Screen name="MedicineList" component={MedicineList} />

			<Stack.Screen
				name="MedicalReference"
				component={MedicalReference}
			/>

			<Stack.Screen name="Profile" component={Profile} />

			<Stack.Screen
				name="SpecializedMaps"
				options={slideFromRightAnimation}
				component={SpecializedMaps}
			/>

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

			<Stack.Screen
				name="RequestScreen"
				options={slideFromRightAnimation}
				component={RequestScreen}
			/>

			<Stack.Screen
				name="ReferenceDetails"
				options={slideFromRightAnimation}
				component={ReferenceDetails}
			/>

			<Stack.Screen
				name="IncomingCall"
				component={IncomingCall}
				options={{
					animation: "none",
				}}
			/>
			<Stack.Screen
				name="OutgoingCall"
				component={OutgoingCall}
				options={{
					animation: "none",
				}}
			/>
			<Stack.Screen
				name="OngoingCall"
				component={OngoingCall}
				options={{
					animation: "none",
				}}
			/>
		</Stack.Navigator>
	);
};

export default RootStack;
