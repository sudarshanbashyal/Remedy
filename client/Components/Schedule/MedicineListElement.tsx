import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { SettingsIcon } from "../../Styles/SVG/Svg";

const weekMap = ["S", "M", "T", "W", "T", "F", "S"];

const MedicineListElement = ({ medicine }) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const handleScheduleNavigation = () => {
		navigation.navigate("ScheduleDetails", {
			medicineId: medicine.id,
		});
	};

	const [style, setStyle] = useState({});

	useEffect(() => {
		const statusStyle =
			medicine.status === "active"
				? styles.activeMedicineStatus
				: styles.inactiveMedicineStatus;

		setStyle({ ...styles.medicine, ...statusStyle });
	}, [medicine]);

	return (
		<View style={style}>
			<View>
				<Text style={styles.medicineName}>{medicine.name}</Text>
				<Text style={styles.medicineFrequency}>
					Frequency Per Week: {medicine.frequency}
				</Text>

				<View style={styles.medicineFrequencyContainer}>
					{weekMap.map((day: string, index: number) => (
						<Text
							key={index}
							style={
								medicine.days.includes(index)
									? styles.activeFrequencyText
									: styles.inactiveFrequencyTest
							}
						>
							{day}
						</Text>
					))}
				</View>
			</View>

			<View>
				<TouchableOpacity onPress={handleScheduleNavigation}>
					<SettingsIcon size={20} color={colors.opaqueWhite} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MedicineListElement;
