import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { RegistrationStepProp } from "./ProfileStep";

const AccountStep = ({
	userData,
	handleChange,
	errors,
	setErrors,
}: RegistrationStepProp) => {
	useEffect(() => {
		setErrors([]);
	}, []);

	return (
		<View>
			<Text style={styles.loginTitle}>Setup your Account</Text>

			{errors.length > 0 && (
				<View style={styles.registrationErrorContainer}>
					{errors.map((error: string) => (
						<Text key={error} style={styles.registrationError}>
							{error}
						</Text>
					))}
				</View>
			)}

			<TextInput
				value={userData.email}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "email");
				}}
				placeholder="Email Address"
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
			/>

			<TextInput
				value={userData.password}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "password");
				}}
				placeholder="Password"
				secureTextEntry={true}
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
			/>

			<TextInput
				value={userData.confirmPassword}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "confirmPassword");
				}}
				placeholder="Confirm Password"
				secureTextEntry={true}
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
			/>
		</View>
	);
};

export default AccountStep;
