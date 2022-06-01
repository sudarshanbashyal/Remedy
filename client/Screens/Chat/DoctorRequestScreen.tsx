import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { makeApiCall } from "../../API/api";
import {
	CHANGE_REQUEST_STATUS,
	GET_INCOMING_REQUESTS,
	HTTP_POST,
	HTTP_PUT,
} from "../../API/apiTypes";
import DoctorRequestItem, {
	RequestStatusType,
} from "../../Components/Chat/DoctorRequestItem";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
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
	const [loading, setLoading] = useState<boolean>(true);

	const goBack = () => {
		navigation.navigate("ChatList");
	};

	const handleRequestResponse = async (
		requestId: string,
		status: RequestStatusType
	) => {
		const apiResponse = await makeApiCall({
			endpoint: CHANGE_REQUEST_STATUS,
			httpAction: HTTP_PUT,
			auth: true,
			body: { status },
			queryParams: [requestId],
		});

		if (apiResponse.ok) {
			// remove request from list after response from user
			const unrespondedRequests: DoctorRequestItemType[] =
				requests.filter((request) => request.requestId !== requestId);
			setRequests(unrespondedRequests);

			showToast("success", `Message request ${status}.`);
			setLoading(false);
			return;
		}

		setLoading(false);
		showToast(
			"error",
			"Coudln't respond to request. Please try again later"
		);
	};

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_INCOMING_REQUESTS,
				httpAction: HTTP_POST,
				auth: true,
			});

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

			{loading && (
				<View style={{ marginTop: dimens.xxLarge }}>
					<ActivityIndicator color={colors.primaryWhite} />
				</View>
			)}

			<View style={{ paddingHorizontal: 16 }}>
				<View>
					{!loading &&
						requests.map((request: DoctorRequestItemType) => (
							<DoctorRequestItem
								key={request.requestId}
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
