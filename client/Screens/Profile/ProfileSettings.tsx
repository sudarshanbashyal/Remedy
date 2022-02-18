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
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import {
	bgoptions,
	handleSchedule,
	veryIntensiveTask,
} from "../../Utils/Notification/notification";
import BackgroundService from "react-native-background-actions";

const ProfileSettings = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const goBack = () => {
		navigation.goBack();
	};

	const [date, setDate] = useState<Date>(new Date());

	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
		{ label: "Other", value: "Other" },
	]);

	const [imageURI, setImageURI] = useState<string | null>(null);

	const handleImagePreview = async () => {
		const response: ImagePickerResponse = await launchImageLibrary({
			mediaType: "photo",
			includeBase64: true,
		});

		if (!response.didCancel) {
			const image: Asset = response.assets[0];
			setImageURI(image.uri);
		}
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
									: "https://otakukart.com/wp-content/uploads/2021/12/bojji-becomes-strong.jpg",
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
						value={user.firstName}
					/>
					<TextInput
						placeholder="Last Name"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
						value={user.lastName}
					/>
					<TextInput
						placeholder="Say something about yourself"
						style={styles.inputStyle}
						multiline={true}
						numberOfLines={5}
						placeholderTextColor={colors.opaqueWhite}
						textAlignVertical="top"
						value={user.bio}
					/>

					<View style={styles.profileSettingsFlexContainer}>
						<DropDownPicker
							style={styles.lineGraphDropdown}
							theme="DARK"
							open={open}
							value={user.gender}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							onChangeValue={() => {}}
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
								{formatFullDate(user.dob)}
							</Text>
						</TouchableOpacity>
						<DatePicker
							modal
							mode="date"
							open={datePickerOpen}
							date={date}
							onConfirm={(date) => {
								setDatePickerOpen(false);
								setDate(date);
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

						<TouchableOpacity>
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
