import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import RenderTabComponent from "../Utils/GetNavigation";
import { RootStackType } from "../Stacks/RootStack";
import styles from "../Styles/styles";
import { useDispatch } from "react-redux";
import { changeNavigationAction } from "../Redux/Actions/ApplicationActions";

const BottomNavigationBar = () => {
	const dispatch = useDispatch();

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const handleNavigation = (name: keyof RootStackType) => {
		//dispatch action to change current navigation before actually navigating
		dispatch(changeNavigationAction(name));

		//
		navigation.navigate(name);
	};

	const bottomTabs = ["ChatList", "MedicineList", "MedicineStats", "Profile"];

	return (
		<View style={styles.bottomNavigation}>
			{bottomTabs.map((tab) => (
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
