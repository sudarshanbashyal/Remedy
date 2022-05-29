import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Asset } from "react-native-image-picker";
import { makeApiCall } from "../../API/api";
import { CHECK_EMAIL, HTTP_POST, REGISTER_USER } from "../../API/apiTypes";
import AccountStep from "../../Components/Register/AccountStep";
import ProfessionStep from "../../Components/Register/ProfessionStep";
import ProfileStep from "../../Components/Register/ProfileStep";
import UserTypeSelector from "../../Components/Register/UserTypeSelector";
import { AuthStackType } from "../../Stacks/AuthStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { generateIdenticon } from "../../Utils/Identicon/identicon";
import { showToast } from "../../Utils/Toast";
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
	expertise?: string;
	medicalDocuments?: Asset[];
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
	expertise: null,
	medicalDocuments: [],
};

export const PATIENT_TYPE = "patient";
export const DOCTOR_TYPE = "doctor";

export type UserType = typeof PATIENT_TYPE | typeof DOCTOR_TYPE;

const RegisterScreen = () => {
	const navigation = useNavigation<NavigationProp<AuthStackType>>();

	const handleLoginPage = () => {
		navigation.navigate("Login");
	};

	const [loading, setLoading] = useState<boolean>(false);

	const [currentStep, setCurrentStep] = useState<number>(1);
	const [userData, setUserData] = useState<RegistrationType>(initialUserData);
	const [errors, setErrors] = useState<string[]>([]);

	const [registrationType, setRegistrationType] =
		useState<UserType>(PATIENT_TYPE);

	const [stepLabels, setStepLabels] = useState("");

	const handleChange = (value: string, name: keyof RegistrationType) => {
		setUserData({ ...userData, [name]: value });
	};

	const resetRegistration = () => {
		setCurrentStep(1);
		setUserData(initialUserData);
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
		}

		// check if email already exists
		setLoading(true);
		const apiResponse = await makeApiCall({
			endpoint: CHECK_EMAIL,
			httpAction: HTTP_POST,
			body: { email: userData.email },
		});
		setLoading(false);

		if (apiResponse?.data?.emailExists) {
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

	const checkProfessionSteps = () => {
		const currentErrors = [];

		if (!userData.expertise) {
			currentErrors.push("You must fill the expertise field.");
		}

		console.log(userData.medicalDocuments);
		if (
			!userData.medicalDocuments ||
			userData.medicalDocuments.length === 0
		) {
			currentErrors.push(
				"You must upload at least one medical certificate."
			);
		}

		setErrors(currentErrors);

		if (currentErrors.length > 0) {
			return false;
		}

		return true;
	};

	const handleDocumentImages = (images: Asset[]) => {
		setUserData({ ...userData, medicalDocuments: images });
	};

	const handleRegistration = async () => {
		setLoading(true);

		const correctAccountEntries = await checkAccountStep();

		if (!correctAccountEntries) return;

		if (registrationType === DOCTOR_TYPE) {
			const correctProfessionEntries = checkProfessionSteps();
			if (!correctProfessionEntries) return;
		}

		const avatar = generateIdenticon(
			userData.firstName + userData.lastName
		);

		const apiResponse = await makeApiCall({
			endpoint: REGISTER_USER,
			httpAction: HTTP_POST,
			body: {
				...userData,
				profilePicture: avatar,
			},
		});

		if (apiResponse?.ok) {
			navigation.navigate("Login");
			setLoading(false);
			showToast("success", "Your account was successfully created.");
			return;
		}

		setLoading(false);
		showToast(
			"error",
			"Your account could not be registered. Please try again."
		);
	};

	const moveForward = () => {
		if (registrationType === PATIENT_TYPE) {
			if (currentStep < 2) {
				goNext();
				return;
			}

			handleRegistration();
			return;
		}

		if (currentStep < 3) {
			goNext();
			return;
		}

		handleRegistration();
	};

	useEffect(() => {
		let label = "";

		if (registrationType === PATIENT_TYPE) {
			if (currentStep < 2) {
				label = `Proceed ${currentStep}/2`;
			} else {
				label = "Register Account";
			}

			setStepLabels(label);
			return;
		}

		if (currentStep < 3) {
			label = `Proceed ${currentStep}/3`;
		} else {
			label = "Register Account";
		}

		setStepLabels(label);
	}, [currentStep, registrationType]);

	const goNext = () => {
		const correctEntries = checkProfileStep();
		if (!correctEntries) return;

		setCurrentStep(currentStep + 1);
	};

	return (
		<View style={styles.fullContainer}>
			<View style={styles.loginFlexContainer}>
				<View style={styles.loginContainer}>
					<UserTypeSelector
						registrationType={registrationType}
						setRegistrationType={setRegistrationType}
						resetRegistration={resetRegistration}
					/>

					{currentStep === 1 ? (
						<ProfileStep
							errors={errors}
							handleChange={handleChange}
							userData={userData}
							setErrors={setErrors}
						/>
					) : currentStep === 2 ? (
						<AccountStep
							errors={errors}
							handleChange={handleChange}
							userData={userData}
							setErrors={setErrors}
						/>
					) : (
						<ProfessionStep
							errors={errors}
							handleChange={handleChange}
							userData={userData}
							setErrors={setErrors}
							handleDocumentImages={handleDocumentImages}
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
							onPress={moveForward}
							style={styles.blueButtonContainer}
						>
							{loading ? (
								<ActivityIndicator
									color={colors.primaryWhite}
								/>
							) : (
								<Text style={styles.blueButton}>
									{stepLabels}
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default RegisterScreen;
