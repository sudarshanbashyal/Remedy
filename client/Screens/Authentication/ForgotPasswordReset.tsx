import {
	NavigationProp,
	StackActions,
	useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { makeApiCall } from "../../API/api";
import { HTTP_PUT, RESET_PASSWORD } from "../../API/apiTypes";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { showToast } from "../../Utils/Toast";
import Errors from "../../Components/Feedbacks/Errors";

const ForgotPasswordReset = ({ route }) => {
	const { userId } = route.params;
	const navigation = useNavigation<NavigationProp<AuthStackType>>();

	const [password, setPassword] = useState<string>(null);
	const [confirmPassword, setConfirmPassword] = useState<string>(null);
	const [errors, setErrors] = useState<string[]>([]);

	const handleReset = async () => {
		const allErrors = [];

		if (!password || !confirmPassword) {
			allErrors.push("Please fill up both fields");
		} else if (password !== confirmPassword) {
			allErrors.push("Please enter the same passwords");
		}

		if (allErrors.length > 0) {
			setErrors(allErrors);
			return;
		}

		const apiResponse = await makeApiCall({
			endpoint: RESET_PASSWORD,
			httpAction: HTTP_PUT,
			body: {
				userId,
				password,
			},
		});

		if (!apiResponse?.ok) {
			showToast("error", "Could not reset password");
			return;
		}

		showToast("success", "Password reset successfully!");
		navigation.dispatch(StackActions.replace("Login"));
	};

	return (
		<View style={styles.fullContainer}>
			<View style={styles.loginFlexContainer}>
				<View style={styles.loginContainer}>
					{errors.length > 0 && <Errors errors={errors} />}

					<Text style={styles.loginTitle}>Create new Password</Text>
					<Text
						style={{
							...styles.loginNavigationText,
							marginTop: -dimens.medium,
						}}
					>
						Please create a new password. You can then login with
						your new password
					</Text>

					<View style={{ marginTop: dimens.medium }}>
						<TextInput
							secureTextEntry={true}
							value={password}
							placeholder="Password"
							style={styles.inputStyle}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								setPassword(e.nativeEvent.text);
							}}
						/>
					</View>

					<View style={{ marginTop: dimens.medium }}>
						<TextInput
							value={confirmPassword}
							secureTextEntry={true}
							placeholder="Confirm Password"
							style={{
								...styles.inputStyle,
								marginTop: -dimens.medium,
							}}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								setConfirmPassword(e.nativeEvent.text);
							}}
						/>
					</View>

					<TouchableOpacity
						onPress={handleReset}
						style={{
							...styles.blueButtonContainer,
							...styles.loginCTAContainer,
						}}
					>
						<Text style={styles.blueButton}>Reset Password</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ForgotPasswordReset;
