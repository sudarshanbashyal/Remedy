import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { loginUser } from "../../API/api";
import { loginUserAction } from "../../Redux/Actions/UserActions";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";

export interface LoginType {
	email: string;
	password: string;
}

const LoginScreen = () => {
	const dispatch = useDispatch();

	const navigation = useNavigation<NavigationProp<AuthStackType>>();
	const [error, setError] = useState<string | null>(null);

	const [userData, setUserData] = useState<LoginType>({
		email: null,
		password: null,
	});

	const handleRegisterPage = () => {
		navigation.navigate("Register");
	};

	const handleChange = (name: string, event: any) => {
		const { text } = event.nativeEvent;

		setUserData({ ...userData, [name]: text });
	};

	const handleLogin = async () => {
		setError(null);

		const data = await loginUser(userData);
		if (!data.ok) {
			setError("Invalid email or password.");
		} else {
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
			} = data.user;

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
				})
			);
		}
	};

	return (
		<KeyboardAwareScrollView>
			<View style={styles.fullContainer}>
				<View style={styles.loginFlexContainer}>
					<View style={styles.loginContainer}>
						<Text style={styles.loginTitle}>
							Login to your Account
						</Text>

						{error && (
							<View style={styles.errorContainer}>
								<Text style={styles.errorText}>{error}</Text>
							</View>
						)}

						<TextInput
							value={userData.email}
							placeholder="Email Address"
							style={styles.inputStyle}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								handleChange("email", e);
							}}
						/>

						<TextInput
							value={userData.password}
							placeholder="Password"
							style={styles.inputStyle}
							secureTextEntry={true}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								handleChange("password", e);
							}}
						/>

						<TouchableOpacity onPress={handleRegisterPage}>
							<Text style={styles.loginNavigationText}>
								Don't have an account yet? Register one.
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleLogin}
							style={{
								...styles.blueButtonContainer,
								...styles.loginCTAContainer,
							}}
						>
							<Text style={styles.blueButton}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default LoginScreen;
