import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AuthStack from "./Stacks/AuthStack";
import RootStack from "./Stacks/RootStack";
import { colors } from "./Styles/Colors";
import Toast, { BaseToast } from "react-native-toast-message";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "./Redux/store";
import { makeApiCall } from "./API/api";
import { loginUserAction } from "./Redux/Actions/UserActions";
import { HTTP_GET, FETCH_USER } from "./API/apiTypes";
import { navigationRef } from "./App";
import { Voximplant } from "react-native-voximplant";
import SplashScreen from "./Screens/Splash/SplashScreen";

const StackRenderer = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const voximplant = Voximplant.getInstance();

	const [loading, setLoading] = useState<boolean>(true);

	const toastConfig = {
		success: (props) => (
			<BaseToast
				{...props}
				style={{
					borderLeftColor: colors.primaryBlue,
					backgroundColor: colors.lightGray,
				}}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={{
					color: colors.primaryWhite,
					fontSize: 14,
					fontFamily: "Poppins-Medium",
				}}
			/>
		),

		error: (props) => (
			<BaseToast
				{...props}
				style={{
					borderLeftColor: colors.primaryRed,
					backgroundColor: colors.lightGray,
				}}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={{
					fontSize: 14,
					color: colors.primaryWhite,
					fontFamily: "Poppins-Medium",
				}}
			/>
		),
	};

	// listen for incoming call events
	useEffect(() => {
		if (!user) return;

		voximplant.on(
			Voximplant.ClientEvents.IncomingCall,
			(incomingCallEvent) => {
				navigationRef.current?.navigate("IncomingCall", {
					call: incomingCallEvent.call,
				});
			}
		);
	}, [user]);

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: FETCH_USER,
				httpAction: HTTP_GET,
				auth: true,
			});

			if (apiResponse?.ok) {
				const {
					userId,
					firstName,
					lastName,
					email,
					gender,
					dob,
					medicines,
					token,
					bio,
					profilePicture,
					role,
					voximplantUsername,
				} = apiResponse.data;

				dispatch(
					loginUserAction({
						userId,
						firstName,
						lastName,
						email,
						dob,
						gender,
						medicines,
						token,
						bio,
						profilePicture,
						role,
						voximplantUsername,
					})
				);
			}

			setTimeout(() => {
				setLoading(false);
			}, 1000);
		})();
	}, []);

	return (
		<NavigationContainer ref={navigationRef}>
			<StatusBar backgroundColor={colors.primaryGray} />

			{loading ? <SplashScreen /> : user ? <RootStack /> : <AuthStack />}

			<Toast config={toastConfig} />
		</NavigationContainer>
	);
};

export default StackRenderer;
