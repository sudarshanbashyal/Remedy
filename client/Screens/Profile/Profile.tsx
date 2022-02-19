import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import {
	CalendarIcon,
	GenderIcon,
	ProfileSettingsIcon,
	UserIcon,
} from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";

const Profile = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const handleNavigation = (name: keyof RootStackType) => {
		navigation.navigate(name);
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView style={styles.profileContainer}>
				<View style={styles.profileInfoContainer}>
					<View style={styles.profileInfoImageContainer}>
						<Image
							style={styles.profileInfoImage}
							source={{
								uri: user.profilePicture,
							}}
						/>
					</View>

					<View style={styles.profileInfoUserContainer}>
						<Text style={styles.profileInfoName}>
							{formatName(user.firstName + " " + user.lastName)}
						</Text>

						{user.bio ? (
							<Text style={styles.profileInfoBio}>
								{user.bio}
							</Text>
						) : null}

						<View style={styles.profileInfoFlexContainer}>
							<View style={styles.profileInfoFlexContainer}>
								<CalendarIcon
									size={20}
									color={colors.opaqueWhite}
								/>
								<Text style={styles.profileAdditionalInfo}>
									{formatFullDate(user.dob)}
								</Text>
							</View>

							<View style={styles.profileInfoFlexContainer}>
								<GenderIcon
									size={22}
									color={colors.opaqueWhite}
								/>
								<Text style={styles.profileAdditionalInfo}>
									{user.gender}
								</Text>
							</View>
						</View>
					</View>
				</View>

				<TouchableOpacity
					onPress={() => {
						handleNavigation("ProfileSettings");
					}}
				>
					<View style={styles.profileNavigationContainer}>
						<View style={styles.profileNavigationIcon}>
							<UserIcon color={colors.opaqueWhite} size={30} />
						</View>
						<View>
							<Text style={styles.profileNavigationTitle}>
								Profile Settings
							</Text>
							<Text style={styles.profileNavigationText}>
								In profile settings, you can change your profile
								pictures, and other basic information like name
								and gender.
							</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						handleNavigation("AccountSettings");
					}}
				>
					<View style={styles.profileNavigationContainer}>
						<View style={styles.profileNavigationIcon}>
							<ProfileSettingsIcon
								color={colors.opaqueWhite}
								size={30}
							/>
						</View>
						<View>
							<Text style={styles.profileNavigationTitle}>
								Account Settings
							</Text>
							<Text style={styles.profileNavigationText}>
								Change your email, password, and other account
								information. You will have to confirm your
								password before making any changes.
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default Profile;
