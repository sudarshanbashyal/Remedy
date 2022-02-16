import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../Screens/Authentication/LoginScreen";
import RegisterScreen from "../Screens/Authentication/RegisterScreen";

export type AuthStackType = {
	Login: any;
	Register: any;
};

const AuthStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, animation: "none" }}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
		</Stack.Navigator>
	);
};

export default AuthStack;
