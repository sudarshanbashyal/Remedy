import React from "react";
import { View, Image } from "react-native";
import { colors } from "../Styles/Colors";
import styles from "../Styles/styles";
import { ChatBubbleIcon, GraphIcon, PillsIcon } from "../Styles/SVG/Svg";

const RenderTabComponent = ({ navigationName, currentNavigation }) => {
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
					<ChatBubbleIcon
						size={24}
						color={getColor(navigationName, currentNavigation)}
					/>
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
					<PillsIcon
						size={35}
						color={getColor(navigationName, currentNavigation)}
					/>
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
					<GraphIcon
						size={24}
						color={getColor(navigationName, currentNavigation)}
					/>
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
								uri: "https://avatars.githubusercontent.com/u/47313528?v=4",
							}}
						/>
					</View>
				</View>
			);
	}
};

const getColor = (
	navigationName: string,
	currentNavigation: string
): string => {
	if (navigationName === currentNavigation) return colors.primaryRed;

	return colors.primaryWhite;
};

const currentNavigationTab = (
	navigationName: string,
	currentNavigation: string
) => {
	if (navigationName !== currentNavigation) return null;

	return styles.selectedTabDot;
};

export default RenderTabComponent;
