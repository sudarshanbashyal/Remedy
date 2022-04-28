import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
	Image,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
	View,
} from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon, CancelIcon } from "../../Styles/SVG/Svg";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import {
	Asset,
	ImagePickerResponse,
	launchImageLibrary,
} from "react-native-image-picker";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import Errors from "../../Components/Feedbacks/Errors";
import { makeApiCall } from "../../API/api";
import { updateUserProfileAction } from "../../Redux/Actions/UserActions";
import { showToast } from "../../Utils/Toast";
import { HTTP_PUT, UPDATE_USER_PROFILE } from "../../API/apiTypes";

export interface UserProfileType {
	firstName: string;
	lastName: string;
	bio: string;
	gender: string;
	dob: Date;
	profilePicture: string;
}

const ProfileSettings = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const dispatch = useDispatch();

	const {
		user,
		user: { firstName, lastName, bio, gender, dob, profilePicture },
	} = useSelector((state: RootStore) => state.userReducer);

	const goBack = () => {
		navigation.goBack();
	};

	const [userData, setUserData] = useState<UserProfileType>({
		firstName,
		lastName,
		bio,
		gender,
		dob,
		profilePicture,
	});

	const handleChange = (field: keyof UserProfileType, value: any) => {
		setUserData({
			...userData,
			[field]: value,
		});
	};

	const [errors, setErrors] = useState<string[]>([]);

	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const [items, setItems] = useState([
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
		{ label: "Other", value: "Other" },
	]);

	const [imageURI, setImageURI] = useState<string | null>(null);
	const [encodedImage, setEncodedImage] = useState<string | null>(null);

	const handleImagePreview = async () => {
		const response: ImagePickerResponse = await launchImageLibrary({
			mediaType: "photo",
			includeBase64: true,
		});

		if (!response.didCancel) {
			const image: Asset = response.assets[0];

			setImageURI(image.uri);
			setEncodedImage(image.base64);
		}
	};

	const validateData = (): boolean => {
		const currentErrors = [];

		// check first and last name
		if (!userData.firstName || !userData.lastName) {
			currentErrors.push("You must enter your full name.");
		}

		// check if valid date
		if (new Date(userData.dob) > new Date()) {
			currentErrors.push("Invalid Birth date.");
		}

		setErrors(currentErrors);
		return currentErrors.length === 0;
	};

	const handleSubmit = async () => {
		const validData: boolean = validateData();
		if (!validData) return;

		const apiResponse = await makeApiCall({
			endpoint: UPDATE_USER_PROFILE,
			httpAction: HTTP_PUT,
			auth: true,
			body: {
				userData: {
					...userData,
					profilePicture: encodedImage,
				},
			},
		});

		if (apiResponse.ok) {
			const { data } = apiResponse;

			dispatch(updateUserProfileAction(data));
			showToast("success", "Profile successfully updated.");
			return;
		}

		showToast("error", "Could not update profile");
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
							Profile Settings
						</Text>
					</View>
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					{errors.length > 0 && <Errors errors={errors} />}
				</View>

				<View style={styles.profileImageFlexContainer}>
					<View
						style={{
							...styles.profileInfoImageContainer,
							marginRight: 0,
						}}
					>
						{imageURI && (
							<TouchableOpacity
								style={styles.profileImageCancelContainer}
								onPress={() => {
									setImageURI(null);
									setEncodedImage(null);
								}}
							>
								<CancelIcon
									size={24}
									color={colors.primaryRed}
								/>
							</TouchableOpacity>
						)}

						<Image
							style={styles.profileInfoImage}
							source={{
								uri: imageURI
									? imageURI
									: userData.profilePicture,
							}}
						/>
					</View>

					<TouchableOpacity onPress={handleImagePreview}>
						<Text style={styles.whiteTextButton}>
							Edit Profile Image
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.settingsContainer}>
					<TextInput
						placeholder="First Name"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						value={userData.firstName}
						onChange={(e) => {
							const { text } = e.nativeEvent;
							handleChange("firstName", text);
						}}
					/>
					<TextInput
						placeholder="Last Name"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						value={userData.lastName}
						onChange={(e) => {
							const { text } = e.nativeEvent;
							handleChange("lastName", text);
						}}
					/>
					<TextInput
						placeholder="Say something about yourself"
						style={styles.inputStyle}
						multiline={true}
						numberOfLines={5}
						placeholderTextColor={colors.opaqueWhite}
						textAlignVertical="top"
						value={userData.bio}
						onChange={(e) => {
							const { text } = e.nativeEvent;
							handleChange("bio", text);
						}}
					/>

					<View style={styles.profileSettingsFlexContainer}>
						<DropDownPicker
							style={styles.lineGraphDropdown}
							theme="DARK"
							open={open}
							value={userData.gender}
							items={items}
							setOpen={setOpen}
							setValue={(val) => {
								handleChange("gender", val());
							}}
							setItems={setItems}
							listMode="SCROLLVIEW"
						/>
					</View>

					<View>
						<TouchableOpacity
							style={{ marginTop: 10 }}
							onPress={() => {
								setDatePickerOpen(!datePickerOpen);
							}}
						>
							<Text style={styles.inputStyle}>
								{formatFullDate(userData.dob)}
							</Text>
						</TouchableOpacity>

						<DatePicker
							modal
							mode="date"
							open={datePickerOpen}
							date={new Date(userData.dob)}
							onConfirm={(date) => {
								setDatePickerOpen(false);
								handleChange("dob", date);
							}}
							onCancel={() => {
								setDatePickerOpen(false);
							}}
						/>
					</View>

					<View style={styles.profileActionsContainer}>
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={goBack}
						>
							<Text style={styles.whiteTextButton}>Cancel</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={handleSubmit}>
							<View style={styles.blueButtonContainer}>
								<Text style={styles.blueButton}>
									Save Profile
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileSettings;
