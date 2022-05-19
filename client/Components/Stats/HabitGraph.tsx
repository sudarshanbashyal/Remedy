import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import { useSelector } from "react-redux";
import { makeApiCall } from "../../API/api";
import {
	GET_ALL_INTAKES,
	GET_INTAKE,
	HTTP_GET,
	HTTP_POST,
} from "../../API/apiTypes";
import {
	MedicineType,
	ScheduleType,
} from "../../Redux/Actions/UserActionTypes";
import { RootStore } from "../../Redux/store";
import { IntakeType } from "../../Screens/Schedule/IntakeRegister";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";
import { showToast } from "../../Utils/Toast";

const habitCalendarTheme: Theme = {
	backgroundColor: colors.lightGray,
	calendarBackground: colors.lightGray,
	dayTextColor: colors.primaryWhite,
	arrowColor: colors.primaryYellow,
	selectedDayTextColor: colors.primaryBlue,
	monthTextColor: colors.primaryYellow,
};

const habitIndicators = [
	{
		status: "Skipped",
		color: colors.primaryRed,
	},
	{
		status: "Taken",
		color: colors.primaryGreen,
	},
	{
		status: "Unlisted",
		color: colors.opaqueWhite,
	},
	{
		status: "Mixed",
		color: colors.primaryYellow,
	},
];

const HabitGraph = () => {
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const [displayedMonth, setDisplayedMonth] = useState<string>(
		new Date().toISOString().slice(0, 10)
	);
	const [markedDays, setMarkedDays] = useState({});
	const [selectedDay, setSelectedDay] = useState<Date | null>(null);
	const [selectedDayIntakes, setSelectedDayIntakes] = useState<IntakeType[]>(
		[]
	);

	const [oldestMedicineDate, setOldestMedicineDate] = useState<Date>(
		new Date()
	);

	const markMonths = (intakes: any, startDate: string, endDate: string) => {
		const intakeStatus = {};
		intakes.forEach((intake: any) => {
			if (!intakeStatus[intake.date]) {
				intakeStatus[intake.date] = new Set();
			}

			intakeStatus[intake.date].add(intake.status);
		});

		// marking listed days according to status
		const markedDays = {};
		intakes.forEach((intake: any) => {
			if (!markedDays[intake.date]) {
				markedDays[intake.date] = {
					marked: true,
				};
			}

			let selectedColor = colors.opaqueWhite;

			if (intakeStatus[intake.date].size > 1) {
				selectedColor = colors.primaryYellow;
			} else if (intakeStatus[intake.date].has("Taken")) {
				selectedColor = colors.primaryGreen;
			} else if (intakeStatus[intake.date].has("Skipped")) {
				selectedColor = colors.primaryRed;
			}

			markedDays[intake.date].dotColor = selectedColor;
		});

		// mark rest of the days that are unlisted according to user schedule
		const medicationDays = new Set();

		user.medicines.forEach((medicine) => {
			medicine.days.forEach(medicationDays.add, medicationDays);
		});

		// loop through days of the month to get list of all the days where medication was unlisted

		for (
			let curr = new Date(startDate);
			curr <= new Date(endDate);
			curr.setDate(curr.getDate() + 1)
		) {
			const currentDay = moment(curr).format("YYYY-MM-DD");
			const weekDay = curr.getDay();

			if (!markedDays[currentDay] && medicationDays.has(weekDay)) {
				// continue otherwise
				markedDays[currentDay] = {
					marked: true,
					dotColor: colors.opaqueWhite,
				};
			}
		}

		setMarkedDays(markedDays);
	};

	useEffect(() => {
		(async () => {
			if (!selectedDay) return;

			const scheduleIds: string[] = [];

			user.medicines.forEach((medicine: MedicineType) => {
				// check if this is the oldest added medicine
				console.log(medicine.createdAt);
				if (medicine.createdAt < oldestMedicineDate) {
					setOldestMedicineDate(medicine.createdAt);
				}

				if (
					medicine.days.includes(selectedDay.getDay()) &&
					medicine.active &&
					moment(medicine.createdAt, "YYYY-MM-DD").isSameOrBefore(
						selectedDay,
						"day"
					)
				) {
					medicine.schedules.forEach((schedule: ScheduleType) => {
						const { scheduleId } = schedule;
						scheduleIds.push(scheduleId);
					});
				}
			});

			// query API to get entry for the selected day
			const date = moment(selectedDay).format("YYYY-MM-DD");

			const apiResponse = await makeApiCall({
				endpoint: GET_INTAKE,
				httpAction: HTTP_POST,
				auth: true,
				body: {
					schedules: scheduleIds,
					date: date,
				},
			});

			if (apiResponse.ok) {
				const { data } = apiResponse;
				setSelectedDayIntakes(data);
			}
		})();
	}, [selectedDay]);

	useEffect(() => {
		(async () => {
			const [year, month] = displayedMonth.split("-");

			const endDay = new Date(+year, +month, 0).getDate();

			const startDate = `${year}-${month}-01`;
			const endDate = `${year}-${month}-${endDay}`;

			const apiResponse = await makeApiCall({
				endpoint: GET_ALL_INTAKES,
				httpAction: HTTP_GET,
				auth: true,
				queryParams: [startDate, endDate],
			});

			if (apiResponse.ok) {
				markMonths(apiResponse.data, startDate, endDate);
				return;
			}

			showToast("error", "Could not retrieve intake data.");
			return;
		})();
	}, [displayedMonth]);

	return (
		<View style={styles.medicineGraphContainer}>
			<View
				style={{
					...styles.rowStartContainer,
					marginTop: 0,
					marginBottom: dimens.regular,
				}}
			>
				{habitIndicators.map((indicator, index) => (
					<View
						key={index}
						style={{
							...styles.rowStartContainer,
							marginRight: dimens.medium,
							marginTop: 0,
						}}
					>
						<View
							style={{
								...styles.indiactorCircle,
								backgroundColor: indicator.color,
							}}
						></View>

						<Text style={styles.indicatorText}>
							{indicator.status}
						</Text>
					</View>
				))}
			</View>

			<Calendar
				markedDates={markedDays}
				current={displayedMonth.toString()}
				theme={habitCalendarTheme}
				onDayPress={(date: DateData) => {
					const { dateString } = date;
					const newDate = new Date(dateString);
					setSelectedDay(newDate);
				}}
				onPressArrowLeft={(subtractMonth) => subtractMonth()}
				onPressArrowRight={(addMonth) => addMonth()}
				//
				onMonthChange={(month: DateData) => {
					const { dateString } = month;
					setDisplayedMonth(dateString);
				}}
				enableSwipeMonths={true}
			/>

			{selectedDay && selectedDayIntakes[0] && (
				<View style={styles.habitGraphIntakeContainer}>
					<Text style={styles.habitGraphDate}>
						{formatFullDate(selectedDay)}
					</Text>

					{selectedDayIntakes.map(
						(intake: IntakeType, index: number) => (
							<Text style={styles.habitGraphEntry} key={index}>
								{intake.schedule.hour > 12
									? intake.schedule.hour - 12
									: intake.schedule.hour}
								:{intake.schedule.minutes}
								{intake.schedule.hour > 12 ? " PM " : " AM "}
								<Text> - {intake.schedule.medicine.name}</Text>
								<Text
									style={{
										color:
											intake.status === "Taken"
												? colors.primaryGreen
												: intake.status === "Skipped"
												? colors.primaryRed
												: colors.opaqueWhite,
									}}
								>
									{" "}
									({intake.status})
								</Text>
							</Text>
						)
					)}
				</View>
			)}
		</View>
	);
};

export default HabitGraph;
