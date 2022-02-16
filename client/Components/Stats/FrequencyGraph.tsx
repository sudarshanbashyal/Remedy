import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "../../Styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import { graphConfigs } from "../../Screens/Stats/MedicineStats";

const FrequencyGraph = ({ allStats }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);

	const [graphData, setGraphData] = useState(null);

	const setGraphValues = (e: string) => {
		setValue(e);

		const labels = Object.keys(allStats[e]);
		const data = Object.values(allStats[e]);

		setGraphData({ labels, data });
	};

	useEffect(() => {
		const allMedicines = Object.keys(allStats).map((med) => {
			return {
				label: med,
				value: med,
			};
		});

		setItems(allMedicines);
		setValue(allMedicines[0].label);
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
