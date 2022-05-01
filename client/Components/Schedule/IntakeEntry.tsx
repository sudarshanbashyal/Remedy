import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IntakeType } from "../../Screens/Schedule/IntakeRegister";
import styles, { dimens } from "../../Styles/styles";

const IntakeEntry = ({ intake }: { intake: IntakeType }) => {
	let intakeHour = intake.hour > 12 ? intake.hour - 12 : intake.hour;
	let intakeHalf = intake.hour > 12 ? "PM" : "AM";

	const [expanded, setExpanded] = useState<boolean>(false);

	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={styles.intakeEntryTime}>
				{intakeHour}:{intake.minutes} {intakeHalf}
			</Text>

			<View style={styles.intakeEntryContainer}>
				<TouchableOpacity
					onPress={() => {
						setExpanded(!expanded);
					}}
				>
					<Text style={styles.intakeName}>{intake.name}</Text>

					<Text style={styles.intakeStatus}>
						Taken today at 6:30 AM
					</Text>

					{expanded && (
						<View style={styles.rowStartContainer}>
							<TouchableOpacity
								style={styles.blueButtonContainer}
							>
								<Text style={styles.blueButton}>
									Mark Taken
								</Text>
							</TouchableOpacity>

							<TouchableOpacity>
								<Text
									style={{
										...styles.whiteTextButton,
										marginLeft: dimens.medium,
									}}
								>
									Skip
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default IntakeEntry;
