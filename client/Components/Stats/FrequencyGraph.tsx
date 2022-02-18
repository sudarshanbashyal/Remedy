import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "../../Styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import {
	FrequencyListType,
	graphConfigs,
} from "../../Screens/Stats/MedicineStats";
import { formatShortDate } from "../../Utils/FormatTime/formatTime";
import NoData from "../Feedbacks/NoData";

const FrequencyGraph = ({
	frequencies,
}: {
	frequencies: FrequencyListType[];
}) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);

	const [graphData, setGraphData] = useState(null);

	const setGraphValues = (e: string) => {
		setValue(e);

		frequencies.forEach((frequency: FrequencyListType) => {
			if (e === frequency.medicineId) {
				const labels = frequency.dates.map((date) =>
					formatShortDate(date)
				);
				const data = frequency.frequencyValues;

				setGraphData({ labels, data });
			}
		});
	};

	useEffect(() => {
		if (frequencies.length === 0) return;

		// set medicine labels
		const labels = [];
		frequencies.forEach((frequency: FrequencyListType) => {
			labels.push({
				label: frequency.medicineName,
				value: frequency.medicineId,
			});
		});

		setItems(labels);
		setValue(frequencies[0].medicineId);

		// set graph values
		console.log(frequencies);
	}, []);

	return (
		<View style={styles.medicineGraphContainer}>
			<View style={styles.lineGraphTitleContainer}>
				<Text style={styles.lineGraphTitleText}>Frequency For:</Text>

				<View style={styles.lineGraphDropDownContainer}>
					<DropDownPicker
						style={styles.lineGraphDropdown}
						theme="DARK"
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						onChangeValue={setGraphValues}
					/>
				</View>
			</View>

			{frequencies.length === 0 && <NoData />}
			{graphData !== null && (
				<LineChart
					data={{
						labels: graphData.labels,
						datasets: [
							{
								data: graphData.data,
							},
						],
					}}
					width={Dimensions.get("window").width - 40}
					height={220}
					yAxisInterval={1}
					chartConfig={graphConfigs}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16,
					}}
				/>
			)}
		</View>
	);
};

export default FrequencyGraph;
