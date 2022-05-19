import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import styles, { dimens } from "../../Styles/styles";
import { getChatPreviews } from "../../Utils/Chat/getChatList";

const PatientList = () => {
	const {
		user: { userId },
	} = useSelector((state: RootStore) => state.userReducer);

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goToPatientHistory = (messageWith: string, recipentId: string) => {
		navigation.navigate("PatientHistory", {
			messageWith,
			recipentId,
		});
	};

	const [patients, setPatients] = useState<any>([]);

	useEffect(() => {
		(async () => {
			const chatLists = await getChatPreviews(userId);
			setPatients(chatLists);
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.mailScreenTitle}>My Patients</Text>
				</View>

				{patients.map((patient) => (
					<TouchableOpacity
						style={styles.chatPreview}
						onPress={() => {
							goToPatientHistory(
								patient.messageWith,
								patient.recipentId
							);
						}}
					>
						<View style={styles.chatPreviewImageContainer}>
							<Image
								style={styles.chatPreviewIcon}
								source={{
									uri: patient.userIcon,
								}}
							/>
						</View>

						<Text style={styles.chatPreviewName}>
							{patient.messageWith}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default PatientList;
