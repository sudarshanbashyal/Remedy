import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Errors from "../../Components/Feedbacks/Errors";
import {
	logoutUserAction,
	updateUserAccountAction,
} from "../../Redux/Actions/UserActions";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { validateEmail } from "../../Utils/Validations/validation";
import { makeApiCall } from "../../API/api";
import { showToast } from "../../Utils/Toast";
import { HTTP_PUT, UPDATE_USER_ACCOUNT } from "../../API/apiTypes";
import { Voximplant } from "react-native-voximplant";

export interface AccountSettingsType {
	email: string;
	password?: string;
	confirmPassword?: string;
}

const AccountSettings = () => {
	const voximplant = Voximplant.getInstance();

	const dispatch = useDispatch();
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const { user } = useSelector((state: RootStore) => state.userReducer);

	const [errors, setErrors] = useState<string[]>([]);
	const [accountData, setAccountData] = useState<AccountSettingsType>({
		email: user.email,
		password: "",
		confirmPassword: "",
	});

	const handleChange = (key: keyof AccountSettingsType, e: any) => {
		const { text } = e.nativeEvent;
		setAccountData({ ...accountData, [key]: text });
	};

	const validateFields = (): boolean => {
		const fieldErrors: string[] = [];

		if (!validateEmail(accountData.email)) {
			fieldErrors.push("Please enter a valid email.");
		}

		if (accountData.password.length || accountData.confirmPassword.length) {
			if (accountData.password !== accountData.confirmPassword) {
				fieldErrors.push(
					"Please enter the same passwords in both fields."
				);
			}
		}

		setErrors(fieldErrors);
		return fieldErrors.length === 0;
	};

	const handleSubmit = async () => {
		if (!validateFields()) return;

		const apiResponse = await makeApiCall({
			endpoint: UPDATE_USER_ACCOUNT,
			httpAction: HTTP_PUT,
			auth: true,
			body: { accountData },
		});

		if (apiResponse.ok) {
			showToast("success", "Account Successfully Updated.");
			dispatch(updateUserAccountAction(apiResponse.data.email));
		} else {
			showToast("error", "Could not update account.");
		}
	};

	const goBack = () => {
		navigation.goBack();
	};

	const handleLogout = async () => {
		await voximplant.disconnect();
		dispatch(logoutUserAction());
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.pageHeader}>
					<View style={styles.pageHeaderNavigation}>
						<TouchableOpacity onPress={goBack}>
							<BackIcon size={20} color={colors.primaryRed} />
						</TouchableOpacity>

						<Text style={styles.pageHeaderText}>
							Account Settings
						</Text>
					</View>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					{errors.length > 0 && <Errors errors={errors} />}
				</View>

				<View style={styles.profileContainer}>
					<TextInput
						value={accountData.email}
						placeholder="Email Address"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						onChange={(e) => {
							handleChange("email", e);
						}}
					/>
					<TextInput
						placeholder="Password"
						value={accountData.password}
						secureTextEntry={true}
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						onChange={(e) => {
							handleChange("password", e);
						}}
					/>
					<TextInput
						placeholder="Confirm Password"
						value={accountData.confirmPassword}
						secureTextEntry={true}
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						onChange={(e) => {
							handleChange("confirmPassword", e);
						}}
					/>

					<View style={styles.profileActionsContainer}>
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={goBack}
						>
							<Text style={styles.whiteTextButton}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.blueButtonContainer}
							onPress={handleSubmit}
						>
							<Text style={styles.blueButton}>Save Account</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.logOutContainer}>
						<Text style={styles.accountInfoTitle}>
							Log Out of this App
						</Text>

						<Text style={styles.accountInfoText}>
							Once you log out, your credentials will be removed
							from the app. You will have to enter your
							credentials to log in again.
						</Text>

						<TouchableOpacity
							style={{ marginTop: 15 }}
							onPress={handleLogout}
						>
							<Text style={styles.redTextButton}>Log Out</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default AccountSettings;
