import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../Stacks/RootStack";

const ScheduleHeader = ({ medicineId }: { medicineId: string }) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const goBack = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.pageHeader}>
			<View style={styles.pageHeaderNavigation}>
				<TouchableOpacity onPress={goBack}>
					<BackIcon size={20} color={colors.primaryRed} />
				</TouchableOpacity>

				<Text style={styles.pageHeaderText}>
					{medicineId ? "Edit Reminder" : "New Reminder"}
				</Text>
			</View>
		</View>
	);
};

export default ScheduleHeader;
