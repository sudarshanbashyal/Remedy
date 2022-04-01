import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { addMessageRequest, getDoctors } from "../../API/api";
import PatientRequestItem from "../../Components/Chat/PatientRequestItem";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon, SearchIcon } from "../../Styles/SVG/Svg";
import { showToast } from "../../Utils/Toast";

export interface RequestItemType {
	userId: string;
	firstName: string;
	lastName: string;
	profilePicture: string;
}

const PatientRequestScreen = () => {
	const naviation = useNavigation<NavigationProp<RootStackType>>();

	const [searchQuery, setSearchQuery] = useState<string>("");
	const [doctors, setDoctors] = useState<RequestItemType[]>([]);
	const [requests, setRequests] = useState({});

	const goBack = () => {
		naviation.navigate("ChatList");
	};

	const handleSearch = async () => {
		const apiResponse = await getDoctors(searchQuery);

		if (apiResponse) {
			const { doctors, requests } = apiResponse.data;

			const requestsMap = {};
			requests.forEach((request: any) => {
				const { receivingUser, requestId } = request;
				requestsMap[receivingUser] = requestId;
			});

			setRequests(requestsMap);
			setDoctors(doctors);

			return;
		}

		showToast("error", "Could not retrieve list.");
	};

	const sendMessageRequest = async (receivingUser: string) => {
		const apiResponse = await addMessageRequest(receivingUser);
		if (apiResponse.ok) {
			const { data } = apiResponse;
			setRequests({ ...requests, [receivingUser]: data.requestId });

			showToast("success", "Request successfully sent.");
		}
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
					<View style={styles.chatMediaSearchContainer}>
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

					<View>
						{doctors.map((doctor: RequestItemType) => (
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
