import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { HTTP_PUT, UPDATE_DOCTOR_VERIFICATION } from "../../API/apiTypes";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";

const DoctorDetails = ({ route }) => {
	const { doctor } = route.params;
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goBack = () => {
		navigation.goBack();
	};

	const changeVerification = async () => {
		const apiResponse = await makeApiCall({
			endpoint: UPDATE_DOCTOR_VERIFICATION,
			httpAction: HTTP_PUT,
			queryParams: [doctor.userId],
			auth: true,
			body: { verification: !doctor.verified },
		});

		console.log(apiResponse);
	};

	return (
		<View style={styles.fullContainer}>
			<View style={styles.pageHeader}>
				<View style={styles.pageHeaderNavigation}>
					<TouchableOpacity onPress={goBack}>
						<BackIcon size={20} color={colors.primaryRed} />
					</TouchableOpacity>

					<Text style={styles.pageHeaderText}>
						Details for :{" "}
						{formatName(doctor.firstName + " " + doctor.lastName)}
					</Text>
				</View>
			</View>

			<Text style={{ color: colors.lightWhite }}>
				Verification Status: {doctor.verified.toString()}
			</Text>

			<TouchableOpacity
				style={styles.blueButtonContainer}
				onPress={changeVerification}
			>
				<Text style={styles.blueButton}>
					Change Verification Status
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default DoctorDetails;
