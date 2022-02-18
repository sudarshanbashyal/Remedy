import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { RegistrationType } from "../../Screens/Authentication/RegisterScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";
import Errors from "../Feedbacks/Errors";

export interface RegistrationStepProp {
	userData: RegistrationType;
	handleChange: (value: string, name: keyof RegistrationType) => void;
	errors: string[];
	setErrors: Dispatch<SetStateAction<string[]>>;
}

const ProfileStep = ({
	userData,
	handleChange,
	errors,
	setErrors,
}: RegistrationStepProp) => {
	const [date, setDate] = useState<Date>(new Date());
	const [dateSelected, setDateSelected] = useState<boolean>(false);

	const [datePickerOpen, setDatePickerOpen] = useState(false);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Male", value: "Male" },
		{ label: "Female", value: "Female" },
		{ label: "Other", value: "Other" },
	]);

	useEffect(() => {
		setErrors([]);

		if (userData.dob) {
			setDateSelected(true);
		}
	}, []);

	return (
		<View>
			<Text style={styles.loginTitle}>Enter your Details</Text>

			{errors.length > 0 && <Errors errors={errors} />}

			<TextInput
				value={userData.firstName}
				placeholder="First Name"
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "firstName");
				}}
			/>

			<TextInput
				value={userData.lastName}
				placeholder="Last Name"
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "lastName");
				}}
			/>

			<View style={{ marginBottom: 10 }}>
				<DropDownPicker
					placeholder="Select your Gender"
					placeholderStyle={{
						color: colors.opaqueWhite,
						fontFamily: "Poppins-Medium",
					}}
					style={styles.lineGraphDropdown}
					theme="DARK"
					open={open}
					value={userData.gender || value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					onChangeValue={() => {
						handleChange(value, "gender");
					}}
				/>
			</View>

			<View>
				<TouchableOpacity
					onPress={() => {
						setDatePickerOpen(!datePickerOpen);
					}}
				>
					<Text style={styles.inputStyle}>
						{dateSelected
							? formatFullDate(date)
							: "Select Your Birthdate"}
					</Text>
				</TouchableOpacity>

				<DatePicker
					modal
					mode="date"
					open={datePickerOpen}
					date={date}
					onConfirm={(date) => {
						setDatePickerOpen(false);
						setDate(date);
						setDateSelected(true);
						handleChange(date.toString(), "dob");
					}}
					onCancel={() => {
						setDatePickerOpen(false);
					}}
				/>
			</View>
		</View>
	);
};

export default ProfileStep;
