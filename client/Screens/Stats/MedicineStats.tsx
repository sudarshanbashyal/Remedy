import React from "react";
import { ScrollView, Text, View } from "react-native";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import styles from "../../Styles/styles";
import FrequencyGraph from "../../Components/Stats/FrequencyGraph";
import HabitGraph from "../../Components/Stats/HabitGraph";
import { colors } from "../../Styles/Colors";

export const graphConfigs = {
	backgroundColor: colors.lightGray,
	backgroundGradientFrom: colors.lightGray,
	backgroundGradientTo: colors.lightGray,
	decimalPlaces: 0,

	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	style: {
		borderRadius: 16,
	},
	propsForDots: {
		r: "6",
		strokeWidth: "2",
		stroke: colors.primaryRed,
	},
};

export const chartConfig = {
	backgroundGradientFrom: colors.lightGray,
	backgroundGradientFromOpacity: 1,
	backgroundGradientTo: colors.lightGray,
	backgroundGradientToOpacity: 1,
	color: (opacity = 1) => `rgba(246, 79, 100, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

const MedicineStats = () => {
	const allStats = {
		"Medicine 1": {
			"Jan 4": 4,
			"Mar 5": 5,
			"Jun 8": 6,
		},
		"Medicine 2": {
			"Jan 4": 10,
			"Mar 5": 5,
			"Jun 8": 10,
		},
		"Medicine 3": {
			"Jan 4": 1,
			"Mar 5": 0,
			"Jun 8": 3,
			"Sept 15": 5,
			"Oct 15": 3,
			"Nov 15": 4,
		},
		"Medicine 4": {
			"Jan 4": 10,
			"Mar 5": 5,
			"Jun 8": 10,
		},
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.medicineStatsContainer}>
					<Text style={styles.chatTitle}>My Medicine Stats</Text>
				</View>

				<FrequencyGraph allStats={allStats} />

				<HabitGraph />
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default MedicineStats;
