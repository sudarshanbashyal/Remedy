import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import RenderTabComponent from "../Utils/Navigation/GetNavigation";
import { RootStackType } from "../Stacks/RootStack";
import styles from "../Styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeNavigationAction } from "../Redux/Actions/ApplicationActions";
import { RootStore } from "../Redux/store";

const BottomNavigationBar = () => {
	const dispatch = useDispatch();

	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const { user } = useSelector((state: RootStore) => state.userReducer);

	const handleNavigation = (name: keyof RootStackType) => {
		//dispatch action to change current navigation before actually navigating
		dispatch(changeNavigationAction(name));

		navigation.navigate(name);
	};

	const [bottomTabs, setBottomTabs] = useState<string[]>([]);

	useEffect(() => {
		let tabs = ["ChatList"];

		if (user.role === "Doctor") {
			tabs = [...tabs, ...["PatientList", "MedicalReference"]];
		} else {
			tabs = [
				...tabs,
				...["MedicineList", "IntakeRegister", "MedicineStats"],
			];
		}

		tabs.push("Profile");

		setBottomTabs(tabs);
	}, [user]);

	return (
		<View style={styles.bottomNavigation}>
			{bottomTabs.length > 0 &&
				bottomTabs.map((tab) => (
					<TouchableOpacity
						key={tab}
						onPress={() => {
							handleNavigation(tab as keyof RootStackType);
						}}
					>
						<RenderTabComponent navigationName={tab} />
					</TouchableOpacity>
				))}
		</View>
	);
};

export default BottomNavigationBar;
