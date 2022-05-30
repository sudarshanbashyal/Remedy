import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { makeApiCall } from "../../API/api";
import { HTTP_POST, LOGIN_USER } from "../../API/apiTypes";
import { loginUserAction } from "../../Redux/Actions/UserActions";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { showToast } from "../../Utils/Toast";

export interface LoginType {
	email: string;
	password: string;
}

const LoginScreen = () => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState<boolean>(false);
	const navigation = useNavigation<NavigationProp<AuthStackType>>();
	const [error, setError] = useState<string | null>(null);

	const [userData, setUserData] = useState<LoginType>({
		email: null,
		password: null,
	});

	const handleNavigation = (nav: keyof AuthStackType) => {
		navigation.navigate(nav);
	};

	const handleChange = (name: string, event: any) => {
		const { text } = event.nativeEvent;

		setUserData({ ...userData, [name]: text });
	};

	const handleLogin = async () => {
		setError(null);
		setLoading(true);

		if (!userData.email || !userData.password) {
			setLoading(false);
			setError("Please fill up all the fields");
			return;
		}

		const apiResponse = await makeApiCall({
			endpoint: LOGIN_USER,
			httpAction: HTTP_POST,
			body: userData,
		});

		if (apiResponse?.ok) {
			// check if the user is verified
			const { verified } = apiResponse.data;
			if (!verified) {
				showToast("error", "Your account is not verified yet.");
				setLoading(false);
				return;
			}

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

			setLoading(false);
			return;
		}

		setLoading(false);
		showToast("error", "Invalid Username or Password");
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
						<TouchableOpacity
							onPress={() => {
								handleNavigation("ForgotPasswordEmail");
							}}
						>
							<Text
								style={{
									...styles.loginNavigationText,
									textAlign: "right",
									marginTop: dimens.small,
								}}
							>
								Forgot Password?
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleLogin}
							style={{
								...styles.blueButtonContainer,
								...styles.loginCTAContainer,
							}}
						>
							{loading ? (
								<ActivityIndicator
									color={colors.primaryWhite}
								/>
							) : (
								<Text style={styles.blueButton}>Login</Text>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								handleNavigation("Register");
							}}
						>
							<Text style={styles.loginNavigationText}>
								Don't have an account yet? Register one.
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default LoginScreen;
