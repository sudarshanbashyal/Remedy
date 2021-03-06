import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { makeApiCall } from "../../API/api";
import {
	ADD_MESSAGE_REQUEST,
	GET_DOCTORS,
	HTTP_POST,
} from "../../API/apiTypes";
import PatientRequestItem from "../../Components/Chat/PatientRequestItem";
import NoData from "../../Components/Feedbacks/NoData";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { BackIcon, SearchIcon } from "../../Styles/SVG/Svg";
import { showToast } from "../../Utils/Toast";

export interface RequestItemType {
	userId: string;
	firstName: string;
	lastName: string;
	profilePicture: string;
	professionalDetails: any;
}

const PatientRequestScreen = () => {
	const naviation = useNavigation<NavigationProp<RootStackType>>();

	const [searchQuery, setSearchQuery] = useState<string>("");
	const [doctors, setDoctors] = useState<RequestItemType[]>([]);
	const [requests, setRequests] = useState({});
	const [searched, setSearched] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const goBack = () => {
		naviation.navigate("ChatList");
	};

	const handleSearch = async () => {
		setLoading(true);
		const apiResponse = await makeApiCall({
			endpoint: GET_DOCTORS,
			httpAction: HTTP_POST,
			auth: true,
			body: { name: searchQuery },
		});

		if (apiResponse.ok) {
			const { doctors, requests } = apiResponse.data;

			const requestsMap = {};
			requests.forEach((request: any) => {
				const { receivingUser, requestId } = request;
				requestsMap[receivingUser] = requestId;
			});

			setRequests(requestsMap);
			setDoctors(doctors);

			setLoading(false);
			setSearched(true);
			return;
		}

		setLoading(false);
		setSearched(true);
		showToast("error", "Could not retrieve list.");
	};

	const sendMessageRequest = async (receivingUser: string) => {
		const apiResponse = await makeApiCall({
			endpoint: ADD_MESSAGE_REQUEST,
			httpAction: HTTP_POST,
			auth: true,
			body: { receivingUser },
		});

		if (apiResponse.ok) {
			const { data } = apiResponse;
			setRequests({ ...requests, [receivingUser]: data.requestId });

			showToast("success", "Request successfully sent.");
			return;
		}

		showToast("error", "Could send message request.");
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.pageHeader}>
					<View style={styles.pageHeaderNavigation}>
						<TouchableOpacity onPress={goBack}>
							<BackIcon size={20} color={colors.primaryRed} />
						</TouchableOpacity>

						<Text style={styles.pageHeaderText}>
							Message Requests
						</Text>
					</View>
				</View>

				<View style={styles.messageRequestContainer}>
					<View style={styles.searchContainer}>
						<TextInput
							placeholder="Search Doctor"
							placeholderTextColor={colors.opaqueWhite}
							style={{
								...styles.inputStyle,
								width: "85%",
							}}
							value={searchQuery}
							onChange={(e) => {
								const { text } = e.nativeEvent;
								setSearchQuery(text);
							}}
						/>

						<TouchableOpacity onPress={handleSearch}>
							<SearchIcon color={colors.primaryWhite} size={24} />
						</TouchableOpacity>
					</View>

					{loading && (
						<View style={{ marginTop: dimens.xxLarge }}>
							<ActivityIndicator color={colors.primaryWhite} />
						</View>
					)}

					{searched && doctors.length === 0 && (
						<NoData
							title="No Doctors"
							description="Hmm, the name that you searched for did not bring up any doctors registered in our app."
						/>
					)}

					<View>
						{!loading &&
							doctors.map((doctor: RequestItemType) => (
								<PatientRequestItem
									key={doctor.userId}
									doctor={doctor}
									requests={requests}
									sendMessageRequest={sendMessageRequest}
								/>
							))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default PatientRequestScreen;
