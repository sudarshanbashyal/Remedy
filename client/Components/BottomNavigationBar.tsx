import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import RenderTabComponent from "../Utils/GetNavigation";
import { RootStackType } from "../Stacks/RootStack";
import styles from "../Styles/styles";
import { useSelector } from "react-redux";
import { RootStore } from "../Redux/store";

const BottomNavigationBar = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const { currentNavigation } = useSelector(
		(state: RootStore) => state.applicationReducer
	);

	const handleNavigation = (name: keyof RootStackType) => {
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
					<RenderTabComponent
						navigationName={tab}
						currentNavigation={currentNavigation}
					/>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default BottomNavigationBar;
