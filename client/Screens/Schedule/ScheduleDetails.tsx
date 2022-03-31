import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	ScrollView,
	Switch,
	Text,
	TextInput,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import ScheduleDays from "../../Components/Schedule/ScheduleDays";
import ScheduleHeader from "../../Components/Schedule/ScheduleHeader";
import ScheuleTime from "../../Components/Schedule/ScheduleTime";
import { ScheduleTimeType } from "../../Components/Schedule/ScheduleTime";
import {
	addMedicine,
	getMedicineDetails,
	updateMedicineDetails,
} from "../../API/api";
import { useDispatch } from "react-redux";
import {
	addMedicineAction,
	updateMedicineAction,
} from "../../Redux/Actions/UserActions";
import { showToast } from "../../Utils/Toast";

const emptySchedule: ScheduleTimeType = {
	hour: null,
	minutes: null,
	half: "AM",
};

export interface MedicineDataType {
	name: string;
	description: string;
	schedules: ScheduleTimeType[];
	days: number[];
}

const ScheduleDetails = ({ route }) => {
	const [medicineId, setMedicineId] = useState<undefined | string>(undefined);

	const dispatch = useDispatch();
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goBack = () => {
		navigation.goBack();
	};

	const [medicineData, setMedicineData] = useState<{
		name: string;
		description: string;
		isActive: boolean;
	}>({
		name: null,
		description: null,
		isActive: true,
	});

	const [scheduleTimes, setScheduleTimes] = useState<ScheduleTimeType[]>([
		emptySchedule,
	]);

	const [selectedDays, setSelectedDays] = useState<number[]>([]);

	const [errors, setErrors] = useState<string[]>([]);

	const checkScheduleDetails = (): boolean => {
		let validData = true;

		scheduleTimes.forEach((scheduleTime: ScheduleTimeType) => {
			let { minutes, hour } = scheduleTime;

			minutes = minutes?.toString().trim();
			hour = hour?.toString().trim();

			if (!minutes || !hour || hour === "" || minutes === "") {
				validData = false;
			}

			if (isNaN(+scheduleTime.minutes) || isNaN(+scheduleTime.hour)) {
				validData = false;
			}
		});

		return validData;
	};

	const validateFields = (): boolean => {
		const currentErrors = [];

		if (!medicineData.name) {
			currentErrors.push("You must specify your medicine name.");
		}

		if (!checkScheduleDetails()) {
			currentErrors.push("Please fill in all the schedules properly.");
		}

		if (selectedDays.length === 0) {
			currentErrors.push("At least one week day must be selected.");
		}

		setErrors(currentErrors);

		if (currentErrors.length > 0) {
			return false;
		}

		return true;
	};

	const handleMedicineAdd = async () => {
		const validFields = validateFields();
		if (!validFields) return;

		const { data } = await addMedicine({
			...medicineData,
			days: selectedDays,
			schedules: scheduleTimes,
		});

		if (data) {
			dispatch(addMedicineAction(data));
			showToast("success", "Medicine Schedule Successfully Added.");
		}
	};

	const handleMedicineUpate = async () => {
		const validFields = validateFields();
		if (!validFields) return;

		const { data } = await updateMedicineDetails(medicineId, {
			...medicineData,
			days: selectedDays,
			schedules: scheduleTimes,
		});

		if (data) {
			dispatch(updateMedicineAction(medicineId, data));
			showToast("success", "Medicine Schedule Successfully Updated.");
		}
	};

	const addNewTime = (): void => {
		setScheduleTimes((scheduleTimes) => [...scheduleTimes, emptySchedule]);
	};

	const removeTime = (index: number): void => {
		const newTimes: ScheduleTimeType[] = scheduleTimes.filter(
			(time: ScheduleTimeType, currIndex: number) => index !== currIndex
		);

		setScheduleTimes(newTimes);
	};

	const changePreferredHalf = (index: number, newHalf: string) => {
		const newSchedule: ScheduleTimeType[] = scheduleTimes.map(
			(time: ScheduleTimeType, currIndex: number) => {
				if (currIndex !== index) return time;

				return { ...time, half: newHalf };
			}
		);

		setScheduleTimes(newSchedule);
	};

	const changeTime = (index: number, type: string, event: any) => {
		let { text: newTime } = event.nativeEvent;

		if (type == "minutes") {
			if (+newTime > 59 || +newTime < 0) {
				ToastAndroid.show("Invalid minutes value.", ToastAndroid.LONG);
				return;
			}
		} else {
			if (+newTime > 12 || +newTime < 0) {
				ToastAndroid.show("Invalid hour value.", ToastAndroid.LONG);
				return;
			}
		}

		const newSchedule: ScheduleTimeType[] = scheduleTimes.map(
			(time: ScheduleTimeType, currIndex: number) => {
				if (currIndex !== index) return time;

				if (type === "minutes") {
					return { ...time, minutes: newTime };
				}

				// check if hour is set to 0, if yes, change it to 12

				if (newTime === "0") {
					newTime = "12";
				}
				return { ...time, hour: newTime };
			}
		);

		setScheduleTimes(newSchedule);
	};

	const getMedicine = async (medicineId: string) => {
		const { data } = await getMedicineDetails(medicineId);

		if (!data) {
			showToast("error", "The medicine couldn't be fetched.");
			return;
		}

		const { active, days, description, name } = data;
		setMedicineData({
			name,
			description,
			isActive: active,
		});

		setSelectedDays(days);

		// select schedule times
		let currentScheduleTimes: ScheduleTimeType[] = [];
		data.schedules.forEach((schedule: any) => {
			let hour =
				+schedule.hour > 12 ? +schedule.hour - 12 : +schedule.hour;
			let minutes = +schedule.minutes || +"00";
			let half = +schedule.hour > 12 ? "PM" : "AM";

			currentScheduleTimes.push({ hour, minutes, half });
		});

		setScheduleTimes(currentScheduleTimes);
	};

	// fetch medicine information (if need be)
	useEffect(() => {
		(async () => {
			const medicineId =
				(route?.params && route.params.medicineId) || undefined;

			if (medicineId) {
				setMedicineId(medicineId);
				getMedicine(medicineId);
			}
		})();
	}, []);

	return (
		<ScrollView style={styles.fullContainer}>
			<ScheduleHeader medicineId={medicineId} />

			<View style={styles.scheduleBody}>
				{errors.length > 0 && (
					<View style={styles.errorContainer}>
						{errors.map((error: string) => (
							<Text key={error} style={styles.errorText}>
								{error}
							</Text>
						))}
					</View>
				)}

				<View>
					<Text style={styles.scheuleTitle}>What's it for?</Text>

					<TextInput
						style={styles.inputStyle}
						placeholder="Medicine Name"
						placeholderTextColor={colors.opaqueWhite}
						value={medicineData.name}
						onChange={(e) => {
							setMedicineData({
								...medicineData,
								name: e.nativeEvent.text,
							});
						}}
					/>

					<TextInput
						numberOfLines={6}
						style={styles.inputStyle}
						placeholder="Description (Optional)"
						placeholderTextColor={colors.opaqueWhite}
						textAlignVertical="top"
						value={medicineData.description}
						onChange={(e) => {
							setMedicineData({
								...medicineData,
								description: e.nativeEvent.text,
							});
						}}
					/>

					<View style={styles.scheduleActiveContainer}>
						<Text style={styles.scheduleActiveText}>
							I'm currently taking this medication
						</Text>

						<Switch
							trackColor={{
								false: colors.lightGray,
								true: colors.primaryRed,
							}}
							thumbColor={
								medicineData.isActive
									? colors.lightGray
									: colors.opaqueWhite
							}
							onValueChange={() => {
								setMedicineData({
									...medicineData,
									isActive: !medicineData.isActive,
								});
							}}
							value={medicineData.isActive}
						/>
					</View>
				</View>

				<ScheuleTime
					scheduleTimes={scheduleTimes}
					addNewTime={addNewTime}
					removeTime={removeTime}
					changePreferredHalf={changePreferredHalf}
					changeTime={changeTime}
				/>
				<ScheduleDays
					selectedDays={selectedDays}
					setSelectedDays={setSelectedDays}
				/>

				<View style={styles.scheduleActionsContainer}>
					<TouchableOpacity onPress={goBack}>
						<Text style={styles.scheduleCancel}>Cancel</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.blueButtonContainer}
						onPress={
							medicineId ? handleMedicineUpate : handleMedicineAdd
						}
					>
						<Text style={styles.blueButton}>
							{medicineId ? "Update Schedule" : "Save Schedule"}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default ScheduleDetails;
