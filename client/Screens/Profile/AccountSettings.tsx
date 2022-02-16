import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import {
	Image,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../Redux/Actions/UserActions";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";

const AccountSettings = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const { user } = useSelector((state: RootStore) => state.userReducer);

	const goBack = () => {
		navigation.goBack();
	};

	const handleLogout = () => {
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

				<View style={styles.profileContainer}>
					<TextInput
						value={user.email}
						placeholder="Email Address"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
					/>
					<TextInput
						placeholder="Password"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
					/>
					<TextInput
						placeholder="Confirm Password"
						style={styles.inputStyle}
						placeholderTextColor={colors.opaqueWhite}
					/>

					<View style={styles.profileActionsContainer}>
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={goBack}
						>
							<Text style={styles.whiteTextButton}>Cancel</Text>
						</TouchableOpacity>

						<View style={styles.blueButtonContainer}>
							<Text style={styles.blueButton}>Save Account</Text>
						</View>
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
