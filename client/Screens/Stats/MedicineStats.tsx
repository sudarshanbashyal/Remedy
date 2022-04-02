import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import styles from "../../Styles/styles";
import FrequencyGraph from "../../Components/Stats/FrequencyGraph";
import HabitGraph from "../../Components/Stats/HabitGraph";
import { colors } from "../../Styles/Colors";
import { getFrequencies } from "../../API/api";

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

export interface FrequencyListType {
	medicineName: string;
	medicineId: string;
	dates: Date[];
	frequencyValues: number[];
}

const MedicineStats = () => {
	const [frequencies, setFrequencies] = useState<FrequencyListType[]>([]);

	useEffect(() => {
		(async () => {
			const allFrequencies: FrequencyListType[] = [];

			const { data } = await getFrequencies();

			data.forEach((frequency: any) => {
				const frequencyDates = [];
				const frequencyValues = [];

				frequency.frequencies.forEach((val: any) => {
					frequencyDates.push(val.date);
					frequencyValues.push(val.frequencyPerWeek);
				});

				allFrequencies.push({
					medicineName: frequency.name,
					medicineId: frequency.medicineId,
					dates: frequencyDates,
					frequencyValues: frequencyValues,
				});
			});

			setFrequencies(allFrequencies);
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.medicineStatsContainer}>
					<Text style={styles.mailScreenTitle}>
						My Medicine Stats
					</Text>
				</View>

				<FrequencyGraph frequencies={frequencies} />

				<HabitGraph />
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default MedicineStats;
