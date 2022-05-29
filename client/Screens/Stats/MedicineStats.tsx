import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import styles, { dimens } from "../../Styles/styles";
import FrequencyGraph from "../../Components/Stats/FrequencyGraph";
import HabitGraph from "../../Components/Stats/HabitGraph";
import { colors } from "../../Styles/Colors";
import { makeApiCall } from "../../API/api";
import { GET_FREQUENCIES, HTTP_GET } from "../../API/apiTypes";
import { showToast } from "../../Utils/Toast";

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
		stroke: colors.primaryBlue,
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

			const apiResponse = await makeApiCall({
				endpoint: GET_FREQUENCIES,
				httpAction: HTTP_GET,
				auth: true,
			});

			if (apiResponse.ok) {
				apiResponse.data.forEach((frequency: any) => {
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
				return;
			}

			showToast("error", "Could not retrieve data");
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<HabitGraph />

				<View style={{ marginTop: dimens.xxLarge }}>
					<FrequencyGraph frequencies={frequencies} />
				</View>
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default MedicineStats;
