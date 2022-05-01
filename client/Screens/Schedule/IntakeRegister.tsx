import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import CalendarStrip from "react-native-calendar-strip";
import styles from "../../Styles/styles";
import { colors } from "../../Styles/Colors";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/store";
import moment, { Moment } from "moment";
import {
	MedicineType,
	ScheduleType,
} from "../../Redux/Actions/UserActionTypes";
import IntakeEntry from "../../Components/Schedule/IntakeEntry";
import { makeApiCall } from "../../API/api";
import { GET_INTAKE, HTTP_POST } from "../../API/apiTypes";

export interface IntakeType {
	intakeId: string;
	status: string;
	scheduleId: string;
	intakeTime: Date;
	schedule: {
		hour: number;
		minutes: number;
		scheduleId: string;
		medicine: {
			medicineId: string;
			name: string;
		};
	};
}

const IntakeRegister = () => {
	const {
		user: { medicines },
	} = useSelector((state: RootStore) => state.userReducer);

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [intakes, setIntakes] = useState<IntakeType[]>([]);

	const changeDate = (date: Moment) => {
		setSelectedDate(moment(date).toDate());
	};

	useEffect(() => {
		(async () => {
			const scheduleIds: string[] = [];

			medicines.forEach((medicine: MedicineType) => {
				if (
					medicine.days.includes(selectedDate.getDay()) &&
					medicine.active
				) {
					medicine.schedules.forEach((schedule: ScheduleType) => {
						const { scheduleId } = schedule;
						scheduleIds.push(scheduleId);
					});
				}
			});

			// query API to get entry for the selected day
			const date = moment(selectedDate).format("YYYY-MM-DD");

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
				setIntakes(data);
			}
		})();
	}, [selectedDate]);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<CalendarStrip
					scrollable
					style={styles.stripCalendar}
					calendarColor={colors.lightGray}
					calendarHeaderStyle={styles.stripCalendarHeader}
					dateNumberStyle={styles.stripCalendarDateNumber}
					dateNameStyle={styles.stripCalendarDateName}
					selectedDate={selectedDate}
					onDateSelected={changeDate}
					highlightDateNumberStyle={styles.highlightDateNumberStyle}
					highlightDateNameStyle={styles.highlightDateNameStyle}
					maxDate={new Date()}
					highlightDateContainerStyle={
						styles.highlightDateContainerStyle
					}
					iconStyle={styles.stripCalendarIconStyle}
				/>

				<View style={styles.intakeContainer}>
					{intakes.map((intake: IntakeType) => (
						<IntakeEntry
							key={intake.intakeId}
							intake={intake}
							selectedDate={selectedDate}
						/>
					))}
				</View>
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default IntakeRegister;
