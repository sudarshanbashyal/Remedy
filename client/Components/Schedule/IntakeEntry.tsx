import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { HTTP_PUT, UPDATE_INTAKE_STATUS } from "../../API/apiTypes";
import { IntakeType } from "../../Screens/Schedule/IntakeRegister";
import styles, { dimens } from "../../Styles/styles";
import { formatHalvedTime } from "../../Utils/FormatTime/formatTime";

const IntakeEntry = ({
	intake: initialIntake,
	selectedDate,
}: {
	intake: IntakeType;
	selectedDate: Date;
}) => {
	const [intake, setIntake] = useState<IntakeType>(initialIntake);
	const [expanded, setExpanded] = useState<boolean>(false);
	const [statusStyle, setStatusStyle] = useState<any>(styles.intakeStatus);
	const [intakeStatus, setIntakeStatus] = useState("");

	const { schedule } = intake;
	const { medicine } = schedule;

	let intakeHour = schedule.hour > 12 ? schedule.hour - 12 : schedule.hour;
	let intakeHalf = schedule.hour > 12 ? "PM" : "AM";

	const updateStatus = async (status: string) => {
		let intakeTime: undefined | Date = undefined;

		if (status === "Taken") {
			intakeTime = new Date();
		}

		const apiResponse = await makeApiCall({
			endpoint: UPDATE_INTAKE_STATUS,
			httpAction: HTTP_PUT,
			auth: true,
			queryParams: [intake.intakeId],
			body: {
				intakeTime,
				intakeStatus: status,
			},
		});

		if (apiResponse.ok) {
			console.log(apiResponse);
			setIntake({ ...intake, ...apiResponse.data });
		}
	};

	useEffect(() => {
		let style = { ...styles.intakeStatus };
		let status = "";

		switch (intake.status.toLowerCase()) {
			case "taken":
				style = { ...style, ...styles.takenIntakeStatus };
				status = `Taken at: ${formatHalvedTime(intake.intakeTime)}`;
				break;

			case "skipped":
				style = { ...style, ...styles.skippedIntakeStatus };
				status = `Skipped for the schedule`;
				break;

			case "unlisted":
				style = { ...style, ...styles.unlistedIntakeStatus };
				status = "Intake not listed yet.";
				break;
		}

		setIntakeStatus(status);
		setStatusStyle(style);
	}, [intake]);

	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={styles.intakeEntryTime}>
				{intakeHour}:{schedule.minutes} {intakeHalf}
			</Text>

			<View style={styles.intakeEntryContainer}>
				<TouchableOpacity
					onPress={() => {
						setExpanded(!expanded);
					}}
				>
					<Text style={styles.intakeName}>{medicine.name}</Text>
					<Text style={statusStyle}>{intakeStatus}</Text>

					{expanded && (
						<View style={styles.rowStartContainer}>
							<TouchableOpacity
								style={styles.blueButtonContainer}
								onPress={() => {
									updateStatus("Taken");
								}}
							>
								<Text style={styles.blueButton}>
									Mark Taken
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									updateStatus("Skipped");
								}}
							>
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
