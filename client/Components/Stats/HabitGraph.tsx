import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import styles from "../../Styles/styles";

const HabitGraph = () => {
	return (
		<View style={styles.medicineGraphContainer}>
			<Calendar />
		</View>
	);
};

export default HabitGraph;
