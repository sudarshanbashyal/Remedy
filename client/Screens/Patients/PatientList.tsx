import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	ScrollView,
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import NoData from "../../Components/Feedbacks/NoData";
import { RootStore } from "../../Redux/store";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { getChatPreviews } from "../../Utils/Chat/getChatList";

const PatientList = () => {
	const {
		user: { userId },
	} = useSelector((state: RootStore) => state.userReducer);

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [loading, setLoading] = useState<boolean>(true);

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
			setLoading(false);
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.mainScreenTitle}>My Patients</Text>
				</View>

				{loading && (
					<View style={{ marginTop: dimens.xxLarge }}>
						<ActivityIndicator color={colors.primaryWhite} />
					</View>
				)}

				{!loading && patients.length === 0 && (
					<NoData
						title="No Patients"
						description="Hmm, it looks like you don't have anyone listed as your patient yet."
					/>
				)}

				{!loading &&
					patients.map((patient) => (
						<TouchableOpacity
							key={patient.recipentId}
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
