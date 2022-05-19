import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles, { dimens } from "../../Styles/styles";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";
import { weekMap } from "../Schedule/MedicineListElement";

const FrequencyDetails = ({
	frequencyDetails,
	selectedMedicineId,
}: {
	frequencyDetails: any;
	selectedMedicineId: string;
}) => {
	const [currentFrequencyDetails, setCurrentFrequencyDetails] =
		useState<any>(null);

	useEffect(() => {
		setCurrentFrequencyDetails(frequencyDetails[selectedMedicineId]);
		console.log(frequencyDetails[selectedMedicineId]);
	}, [selectedMedicineId]);

	return (
		<View
			style={{
				paddingHorizontal: dimens.medium,
				marginTop: dimens.medium,
			}}
		>
			{currentFrequencyDetails && (
				<View>
					{currentFrequencyDetails.details.map(
						(detail: any, index: number) => (
							<View
								style={styles.frequencyDetailContainer}
								key={index}
							>
								<Text style={styles.frequencyDetailDate}>
									{formatFullDate(detail.date)}
								</Text>

								<View style={styles.rowStartContainer}>
									{weekMap.map((weekDay, index) => (
										<Text
											style={
												detail.days.includes(index)
													? styles.frequencyDetailActiveDay
													: styles.frequencyDetailDay
											}
										>
											{weekDay}
										</Text>
									))}
								</View>
							</View>
						)
					)}
				</View>
			)}
		</View>
	);
};

export default FrequencyDetails;
