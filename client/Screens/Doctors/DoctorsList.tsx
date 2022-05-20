import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_ALL_DOCTORS, HTTP_GET } from "../../API/apiTypes";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import { RootStackType } from "../../Stacks/RootStack";
import styles from "../../Styles/styles";
import { formatName } from "../../Utils/FormatName/formatName";

const DoctorsList = () => {
	const [doctors, setDoctors] = useState<any>([]);

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goToDoctorDetails = () => {};

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_ALL_DOCTORS,
				httpAction: HTTP_GET,
				auth: true,
			});

			if (apiResponse.ok) {
				setDoctors(apiResponse.data);
			}
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.mailScreenTitle}>All Doctors</Text>
				</View>

				{doctors.map((doctor) => (
					<TouchableOpacity
						key={doctor.userId}
						style={styles.chatPreview}
						onPress={() => {}}
					>
						<View style={styles.spacedApartContainer}>
							<View>
								<View style={styles.chatPreviewImageContainer}>
									<Image
										style={styles.chatPreviewIcon}
										source={{
											uri: doctor.profilePicture,
										}}
									/>
								</View>

								<Text style={styles.chatPreviewName}>
									{formatName(
										doctor.firstName + " " + doctor.lastName
									)}
								</Text>
							</View>

							<Text>Hello There</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default DoctorsList;
