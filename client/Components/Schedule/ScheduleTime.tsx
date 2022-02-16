import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { MinusIcon, PlusIcon } from "../../Styles/SVG/Svg";

export interface ScheduleTimeType {
	hour: number | null;
	minutes: number | string | null;
	half: string | null;
}

const selectedHalfStyle = StyleSheet.create({
	selected: {
		...styles.scheduleHalf,
		backgroundColor: colors.primaryRed,
	},
});

interface Props {
	scheduleTimes: ScheduleTimeType[];
	addNewTime: () => void;
	removeTime: (index: number) => void;
	changePreferredHalf: (index: number, half: string) => void;
	changeTime: (index: number, type: string, event: any) => void;
}

const ScheuleTime = ({
	scheduleTimes,
	addNewTime,
	removeTime,
	changePreferredHalf,
	changeTime,
}: Props) => {
	return (
		<View style={{ marginTop: 30 }}>
			<Text style={styles.scheuleTitle}>Set up your Schedule</Text>

			{scheduleTimes.map((time: ScheduleTimeType, index: number) => (
				<View key={index}>
					<View style={styles.scheduleTimeContainer}>
						<View style={{ flexDirection: "row" }}>
							<View
								style={{
									...styles.scheduleBlockContainer,
									marginRight: 10,
								}}
							>
								<TextInput
									keyboardType="number-pad"
									style={styles.scheduleTimeInput}
									value={time.hour && time.hour.toString()}
									onChange={(e) => {
										changeTime(index, "hour", e);
									}}
								/>
								<Text style={styles.scheduleBlockText}>
									Hour
								</Text>
							</View>

							<View style={styles.scheduleBlockContainer}>
								<TextInput
									keyboardType="number-pad"
									style={styles.scheduleTimeInput}
									value={
										time.minutes !== null &&
										time.minutes.toString()
									}
									onChange={(e) => {
										changeTime(index, "minutes", e);
									}}
								/>
								<Text style={styles.scheduleBlockText}>
									Minutes
								</Text>
							</View>
						</View>

						<View style={styles.scheduleHalfContainer}>
							<TouchableOpacity
								onPress={() => {
									changePreferredHalf(index, "AM");
								}}
							>
								<View
									style={
										time.half === "AM"
											? selectedHalfStyle.selected
											: styles.scheduleHalf
									}
								>
									<Text style={styles.scheduleHalfText}>
										AM
									</Text>
								</View>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									changePreferredHalf(index, "PM");
								}}
							>
								<View
									style={
										time.half === "PM"
											? selectedHalfStyle.selected
											: styles.scheduleHalf
									}
								>
									<Text style={styles.scheduleHalfText}>
										PM
									</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View style={styles.schedulePlusContainer}>
							<TouchableOpacity>
								{index === scheduleTimes.length - 1 ? (
									<TouchableOpacity onPress={addNewTime}>
										<PlusIcon
											color={colors.opaqueWhite}
											size={30}
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										onPress={() => {
											removeTime(index);
										}}
									>
										<MinusIcon
											color={colors.opaqueWhite}
											size={30}
										/>
									</TouchableOpacity>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export default ScheuleTime;
