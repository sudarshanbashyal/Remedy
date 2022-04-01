import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { changeRequestStatus, getIncomingRequests } from "../../API/api";
import DoctorRequestItem, {
	RequestStatusType,
} from "../../Components/Chat/DoctorRequestItem";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { showToast } from "../../Utils/Toast";

export interface DoctorRequestItemType {
	firstName: string;
	lastName: string;
	profilePicture: string;
	requestId: string;
}

const DoctorRequestScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [requests, setRequests] = useState<DoctorRequestItemType[]>([]);

	const goBack = () => {
		navigation.navigate("ChatList");
	};

	const handleRequestResponse = async (
		requestId: string,
		status: RequestStatusType
	) => {
		const apiResponse = await changeRequestStatus(requestId, status);
		if (apiResponse.ok) {
			// remove request from list after response from user
			const unrespondedRequests: DoctorRequestItemType[] =
				requests.filter((request) => request.requestId !== requestId);
			setRequests(unrespondedRequests);

			showToast("success", `Message request ${status}.`);
			return;
		}

		showToast(
			"error",
			"Coudln't respond to request. Please try again later"
		);
	};

	useEffect(() => {
		(async () => {
			const apiResponse = await getIncomingRequests();
			if (apiResponse.ok) {
				const requestItems: DoctorRequestItemType[] = [];

				apiResponse.data.forEach((item: any) => {
					const { requestId, requestFrom } = item;
					const { firstName, lastName, profilePicture } = requestFrom;

					requestItems.push({
						requestId,
						firstName,
						lastName,
						profilePicture,
					});
				});

				setRequests(requestItems);
				return;
			}

			showToast("error", "Could not retrieve list.");
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<View style={styles.pageHeader}>
				<View style={styles.pageHeaderNavigation}>
					<TouchableOpacity onPress={goBack}>
						<BackIcon size={20} color={colors.primaryRed} />
					</TouchableOpacity>

					<Text style={styles.pageHeaderText}>Message Requests</Text>
				</View>
			</View>

			<View style={{ paddingHorizontal: 16 }}>
				<View>
					{requests.map((request: DoctorRequestItemType) => (
						<DoctorRequestItem
							patient={request}
							handleRequestResponse={handleRequestResponse}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

export default DoctorRequestScreen;
