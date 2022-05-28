import {
	NavigationProp,
	useNavigation,
	StackActions,
} from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { CHECK_EMAIL, HTTP_POST } from "../../API/apiTypes";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { showToast } from "../../Utils/Toast";

const ForgotPasswordEmail = () => {
	const [inputText, setInputText] = useState<string>("");
	const navigation = useNavigation<NavigationProp<AuthStackType>>();

	const handleToken = async () => {
		if (inputText === "") {
			showToast("error", "Pleae enter your email.");
			return;
		}

		const apiResponse = await makeApiCall({
			endpoint: CHECK_EMAIL,
			httpAction: HTTP_POST,
			body: { email: inputText },
		});

		if (apiResponse?.ok && !apiResponse?.data?.emailExists) {
			showToast("error", "User with email doesn't exist");
			return;
		}

		navigation.dispatch(
			StackActions.replace("ForgotPasswordToken", { email: inputText })
		);
	};

	return (
		<View style={styles.fullContainer}>
			<View style={styles.loginFlexContainer}>
				<View style={styles.loginContainer}>
					<Text style={styles.loginTitle}>
						Reset Password - Enter Email
					</Text>
					<Text
						style={{
							...styles.loginNavigationText,
							marginTop: -dimens.medium,
						}}
					>
						Please enter your email address to proceed to the next
						step.
					</Text>

					<View style={{ marginTop: dimens.medium }}>
						<TextInput
							value={inputText}
							placeholder="Email Address"
							style={styles.inputStyle}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								setInputText(e.nativeEvent.text);
							}}
						/>
					</View>

					<TouchableOpacity
						onPress={handleToken}
						style={{
							...styles.blueButtonContainer,
							...styles.loginCTAContainer,
						}}
					>
						<Text style={styles.blueButton}>Proceed</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ForgotPasswordEmail;
