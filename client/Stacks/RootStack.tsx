import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import ChatList from "../Screens/Chat/ChatList";
import ChatMedia from "../Screens/Chat/ChatMedia";
import ChatScreen from "../Screens/Chat/ChatScreen";
import AccountSettings from "../Screens/Profile/AccountSettings";
import Profile from "../Screens/Profile/Profile";
import ProfileSettings from "../Screens/Profile/ProfileSettings";
import MedicineList from "../Screens/Schedule/MedicineList";
import ScheduleDetails from "../Screens/Schedule/ScheduleDetails";
import MedicineStats from "../Screens/Stats/MedicineStats";

export type RootStackType = {
	ChatList: any;
	ChatScreen: any;
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

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: "none",
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
