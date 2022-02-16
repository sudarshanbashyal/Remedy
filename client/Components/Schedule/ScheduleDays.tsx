import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";

const selectedDaysStyle = StyleSheet.create({
	dots: {
		...styles.scheduleDayDot,
		backgroundColor: colors.primaryWhite,
	},
	days: {
		...styles.scheduleDayName,
		color: colors.primaryRed,
	},
});

interface Prop {
	selectedDays: number[];
	setSelectedDays: Dispatch<SetStateAction<number[]>>;
}

const ScheduleDays = ({ selectedDays, setSelectedDays }) => {
	const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	const toggleDay = (index: number) => {
		const exists = selectedDays.includes(index);

		if (exists) {
			const newSelectedList: number[] = selectedDays.filter(
				(day: number) => day != index
			);
			setSelectedDays(newSelectedList);
			return;
		}

		setSelectedDays((selectedDays) => [...selectedDays, index]);
	};

	return (
		<View style={styles.scheduleDaysContainer}>
			{days.map((day: string, index: number) => (
				<TouchableOpacity
					style={styles.scheduleDay}
					key={day}
					onPress={() => {
						toggleDay(index);
					}}
				>
					<View
						style={
							selectedDays.includes(index)
								? selectedDaysStyle.dots
								: styles.scheduleDayDot
						}
					></View>

					<Text
						style={
							selectedDays.includes(index)
								? selectedDaysStyle.days
								: styles.scheduleDayName
						}
					>
						{day}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default ScheduleDays;
