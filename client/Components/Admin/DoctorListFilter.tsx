import React, { Dispatch, useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";

const DoctorListFilter = ({
	doctors,
	setDoctorsToRender,
}: {
	doctors: any;
	setDoctorsToRender: React.SetStateAction<Dispatch<any>>;
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<any>("");
	const [inputText, setInputText] = useState("");
	const [items, setItems] = useState<ItemType[]>([
		{
			label: "All",
			value: "",
		},
		{
			label: "Verified",
			value: true,
		},
		{
			label: "Unverified",
			value: false,
		},
	]);

	const changeStatus = (e: string) => {
		setValue(e);
	};

	useEffect(() => {
		const filteredList = doctors.filter((doctor) => {
			let doctorValid = false;

			// check verification status
			if (value === "") {
				doctorValid = true;
			} else {
				if (doctor.verified === value) {
					doctorValid = true;
				} else {
					doctorValid = false;
				}
			}

			// check name match
			if (
				(
					doctor.firstName.toLowerCase() +
					" " +
					doctor.lastName.toLowerCase()
				).includes(inputText)
			) {
				if (doctorValid) doctorValid = true;
			} else {
				doctorValid = false;
			}

			if (doctorValid) return doctor;
		});

		setDoctorsToRender(filteredList);
	}, [inputText, value]);

	return (
		<View style={styles.doctorFilterContainer}>
			<TextInput
				placeholderTextColor={colors.opaqueWhite}
				placeholder="Search Name"
				value={inputText}
				style={{
					...styles.inputStyle,
					...styles.doctorFilterInput,
				}}
				onChange={(e) => {
					setInputText(e.nativeEvent.text);
				}}
			/>

			<View style={styles.doctorFilterDropdownContainer}>
				<DropDownPicker
					style={styles.lineGraphDropdown}
					theme="DARK"
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					onChangeValue={changeStatus}
					listMode="SCROLLVIEW"
				/>
			</View>
		</View>
	);
};

export default DoctorListFilter;
