import React from "react";
import { View, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import {
	CalendarTickIcon,
	ChatBubbleIcon,
	GraphIcon,
	PillsIcon,
} from "../../Styles/SVG/Svg";

const RenderTabComponent = ({ navigationName }) => {
	const {
		userReducer: { user },
		applicationReducer: { currentNavigation },
	} = useSelector((state: RootStore) => state);

	switch (navigationName) {
		case "ChatList":
			return (
				<View style={styles.bottomTabIconContainer}>
					<View
						style={currentNavigationTab(
							navigationName,
							currentNavigation
						)}
					></View>
					<ChatBubbleIcon size={24} color={colors.primaryWhite} />
				</View>
			);

		case "MedicineList":
			return (
				<View style={styles.bottomTabIconContainer}>
					<View
						style={currentNavigationTab(
							navigationName,
							currentNavigation
						)}
					></View>
					<PillsIcon size={35} color={colors.primaryWhite} />
				</View>
			);

		case "IntakeRegister":
			return (
				<View style={styles.bottomTabIconContainer}>
					<View
						style={currentNavigationTab(
							navigationName,
							currentNavigation
						)}
					></View>
					<CalendarTickIcon size={32} color={colors.primaryWhite} />
				</View>
			);

		case "MedicineStats":
			return (
				<View style={styles.bottomTabIconContainer}>
					<View
						style={currentNavigationTab(
							navigationName,
							currentNavigation
						)}
					></View>
					<GraphIcon size={24} color={colors.primaryWhite} />
				</View>
			);

		case "Profile":
			return (
				<View style={styles.bottomTabIconContainer}>
					<View
						style={currentNavigationTab(
							navigationName,
							currentNavigation
						)}
					></View>
					<View style={styles.bottomTabImageContainer}>
						<Image
							style={styles.bottomTabImage}
							source={{
								uri: user.profilePicture,
							}}
						/>
					</View>
				</View>
			);
	}
};

const currentNavigationTab = (
	navigationName: string,
	currentNavigation: string
) => {
	if (navigationName !== currentNavigation) return null;

	return styles.selectedTabDot;
};

export default RenderTabComponent;
