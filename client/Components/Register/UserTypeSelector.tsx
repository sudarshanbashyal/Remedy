import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
	PATIENT_TYPE,
	DOCTOR_TYPE,
	UserType,
} from "../../Screens/Authentication/RegisterScreen";
import styles from "../../Styles/styles";

const UserTypeSelector = ({
	registrationType,
	setRegistrationType,
	resetRegistration,
}: {
	registrationType: UserType;
	setRegistrationType: React.Dispatch<React.SetStateAction<UserType>>;
	resetRegistration: () => void;
}) => {
	const selectedStyle = {
		...styles.userTypeContainer,
		...styles.selectedUserTypeContainer,
	};

	const changeRegistrationType = (type: UserType) => {
		setRegistrationType(type);
		resetRegistration();
	};

	return (
		<View style={styles.rowStartContainer}>
			<TouchableOpacity
				style={
					registrationType === PATIENT_TYPE
						? selectedStyle
						: styles.userTypeContainer
				}
				onPress={() => {
					changeRegistrationType(PATIENT_TYPE);
				}}
			>
				<Text style={styles.userType}>Patient</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={
					registrationType === DOCTOR_TYPE
						? selectedStyle
						: styles.userTypeContainer
				}
				onPress={() => {
					changeRegistrationType(DOCTOR_TYPE);
				}}
			>
				<Text style={styles.userType}>Doctor</Text>
			</TouchableOpacity>
		</View>
	);
};

export default UserTypeSelector;
