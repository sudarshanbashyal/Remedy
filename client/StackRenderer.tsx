import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AuthStack from "./Stacks/AuthStack";
import RootStack from "./Stacks/RootStack";
import { colors } from "./Styles/Colors";
import Toast, { BaseToast } from "react-native-toast-message";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "./Redux/store";
import { getUserToken } from "./Utils/AsyncStorage/asyncStorage";
import { fetchUser } from "./API/api";
import { loginUserAction } from "./Redux/Actions/UserActions";

const StackRenderer = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootStore) => state.userReducer);

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

	useEffect(() => {
		(async () => {
			const token = await getUserToken();

			if (token) {
				const user = await fetchUser(token);

				if (user) {
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
					} = user;

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
						})
					);
				}
			}
		})();
	}, []);

	return (
		<NavigationContainer>
			<StatusBar backgroundColor={colors.primaryGray} />

			{user ? <RootStack /> : <AuthStack />}

			<Toast config={toastConfig} />
		</NavigationContainer>
	);
};

export default StackRenderer;
