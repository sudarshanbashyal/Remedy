import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPasswordEmail from "../Screens/Authentication/ForgotPasswordEmail";
import ForgotPasswordReset from "../Screens/Authentication/ForgotPasswordReset";
import ForgotPasswordToken from "../Screens/Authentication/ForgotPasswordToken";
import LoginScreen from "../Screens/Authentication/LoginScreen";
import RegisterScreen from "../Screens/Authentication/RegisterScreen";

export type AuthStackType = {
	Login: {
		registeredEmail?: string;
	};
	Register: any;
	ForgotPasswordEmail: any;
	ForgotPasswordToken: {
		email: string;
	};
	ForgotPasswordReset: {
		userId: string;
	};
};

const AuthStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, animation: "none" }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen
				name="ForgotPasswordEmail"
				component={ForgotPasswordEmail}
			/>
			<Stack.Screen
				name="ForgotPasswordToken"
				component={ForgotPasswordToken}
			/>
			<Stack.Screen
				name="ForgotPasswordReset"
				component={ForgotPasswordReset}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
