import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { makeApiCall } from "../../API/api";
import {
	HTTP_POST,
	SET_PASSWORD_RESET_TOKEN,
	VERIFY_TOKEN,
} from "../../API/apiTypes";
import { showToast } from "../../Utils/Toast";
import {
	NavigationProp,
	StackActions,
	useNavigation,
} from "@react-navigation/native";
import { AuthStackType } from "../../Stacks/AuthStack";

const ForgotPasswordToken = ({ route }) => {
	const { email } = route.params;
	const [token, setToken] = useState<string>("");

	const navigation = useNavigation<NavigationProp<AuthStackType>>();

	const verifyToken = async () => {
		const apiResponse = await makeApiCall({
			endpoint: VERIFY_TOKEN,
			httpAction: HTTP_POST,
			body: { email, token },
		});

		if (apiResponse.ok) {
			navigation.dispatch(
				StackActions.replace("ForgotPasswordReset", {
					userId: apiResponse.data.userId,
				})
			);
			return;
		}

		showToast("error", "Invalid Token");
	};

	useEffect(() => {
		const handleToken = async () => {
			const apiResponse = await makeApiCall({
				endpoint: SET_PASSWORD_RESET_TOKEN,
				httpAction: HTTP_POST,
				body: { email },
			});

			console.log(apiResponse);
		};

		handleToken();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<View style={styles.loginFlexContainer}>
				<View style={styles.loginContainer}>
					<Text style={styles.loginTitle}>
						Reset Password - Enter Token
					</Text>
					<Text
						style={{
							...styles.loginNavigationText,
							marginTop: -dimens.medium,
						}}
					>
						A token has been sent to ... Please enter the token
						below to proceed further.
					</Text>

					<View style={{ marginTop: dimens.medium }}>
						<TextInput
							value={token}
							keyboardType="number-pad"
							placeholder="Token"
							style={styles.inputStyle}
							placeholderTextColor={colors.opaqueWhite}
							onChange={(e) => {
								setToken(e.nativeEvent.text);
							}}
						/>
					</View>

					<TouchableOpacity
						onPress={verifyToken}
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

export default ForgotPasswordToken;
