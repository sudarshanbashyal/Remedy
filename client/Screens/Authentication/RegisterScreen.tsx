import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { emailExists, registerUser } from "../../API/api";
import AccountStep from "../../Components/Register/AccountStep";
import ProfileStep from "../../Components/Register/ProfileStep";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { generateIdenticon } from "../../Utils/Identicon/identicon";
import { validateEmail } from "../../Utils/Validations/validation";

export interface RegistrationType {
	firstName: string | null;
	lastName: string | null;
	gender: string | null;
	dob: string | null;
	email: string | null;
	password: string | null;
	confirmPassword: string | null;
	profilePicture: string | null;
}

const initialUserData = {
	firstName: null,
	lastName: null,
	gender: null,
	dob: null,
	email: null,
	password: null,
	confirmPassword: null,
	profilePicture: null,
};

const RegisterScreen = () => {
	const navigation = useNavigation<NavigationProp<AuthStackType>>();

	const handleLoginPage = () => {
		navigation.navigate("Login");
	};

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [userData, setUserData] = useState<RegistrationType>(initialUserData);
	const [errors, setErrors] = useState<string[]>([]);

	const handleChange = (value: string, name: keyof RegistrationType) => {
		setUserData({ ...userData, [name]: value });
	};

	const goBack = () => {
		setCurrentStep(currentStep - 1);
	};

	const checkProfileStep = () => {
		const currentErrors = [];

		if (!userData.firstName || !userData.lastName) {
			currentErrors.push("You must add your full name.");
		}

		if (!userData.gender) {
			currentErrors.push("Please select your gender from the dropdown.");
		}

		if (!userData.dob) {
			currentErrors.push("You must select your full birth date.");
		}

		if (new Date(userData.dob) > new Date()) {
			currentErrors.push("Invalid birth date.");
		}

		setErrors(currentErrors);

		if (currentErrors.length > 0) {
			return false;
		}

		return true;
	};

	const checkAccountStep = async () => {
		const currentErrors = [];

		if (!userData.email) {
			currentErrors.push("You must add your email.");
		} else if (!validateEmail(userData.email)) {
			currentErrors.push("The email you entered is not valid.");
		} else if (await emailExists(userData.email)) {
			currentErrors.push("The email you entered already exists.");
		}

		if (!userData.password || !userData.confirmPassword) {
			currentErrors.push(
				"Please enter your password and then confirm it."
			);
		} else if (userData.password !== userData.confirmPassword) {
			currentErrors.push("Your passwords do not match.");
		}

		setErrors(currentErrors);

		if (currentErrors.length > 0) {
			return false;
		}

		return true;
	};

	const handleRegistration = async () => {
		const correctEntries = checkAccountStep();
		if (!correctEntries) return;

		const avatar = generateIdenticon(
			userData.firstName + userData.lastName
		);

		const registration = await registerUser({
			...userData,
			profilePicture: avatar,
		});

		if (registration) {
			navigation.navigate("Login");
		}
	};

	const goNext = () => {
		const correctEntries = checkProfileStep();
		if (!correctEntries) return;

		setCurrentStep(currentStep + 1);
	};

	return (
		<View style={styles.fullContainer}>
			<View style={styles.loginFlexContainer}>
				<View style={styles.loginContainer}>
					{currentStep === 1 ? (
						<ProfileStep
							errors={errors}
							handleChange={handleChange}
							userData={userData}
							setErrors={setErrors}
						/>
					) : (
						<AccountStep
							errors={errors}
							handleChange={handleChange}
							userData={userData}
							setErrors={setErrors}
						/>
					)}

					<View style={styles.registerStepContainer}>
						<TouchableOpacity
							style={styles.registerBackContainer}
							onPress={
								currentStep == 1 ? handleLoginPage : goBack
							}
						>
							<BackIcon size={20} color={colors.opaqueWhite} />

							<Text style={styles.registerStepBackButton}>
								{currentStep === 1 ? "Cancel" : "Back"}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={
								currentStep === 2 ? handleRegistration : goNext
							}
							style={styles.blueButtonContainer}
						>
							<Text style={styles.blueButton}>
								{currentStep === 2
									? "Register Account"
									: `Proceed ${currentStep}/2`}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default RegisterScreen;
