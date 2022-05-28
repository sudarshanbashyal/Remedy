import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_ALL_DOCTORS, HTTP_GET } from "../../API/apiTypes";
import DoctorListFilter from "../../Components/Admin/DoctorListFilter";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import { RootStackType } from "../../Stacks/RootStack";
import styles, { dimens } from "../../Styles/styles";
import { formatName } from "../../Utils/FormatName/formatName";

const DoctorsList = () => {
	const [doctors, setDoctors] = useState<any>([]);
	const [doctorsToRender, setDoctorsToRender] = useState<any>([]);

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_ALL_DOCTORS,
				httpAction: HTTP_GET,
				auth: true,
			});

			if (apiResponse.ok) {
				setDoctors(apiResponse.data);
				setDoctorsToRender(apiResponse.data);
			}
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.chatTitleContainer}>
					<Text style={styles.mailScreenTitle}>All Doctors</Text>
				</View>

				<DoctorListFilter
					setDoctorsToRender={setDoctorsToRender}
					doctors={doctors}
				/>

				<View style={{ minHeight: dimens.xxLarge * 2 }}>
					{doctorsToRender.map((doctor) => (
						<TouchableOpacity
							key={doctor.userId}
							style={styles.chatPreview}
							onPress={() => {
								navigation.navigate("DoctorDetails", {
									doctor,
								});
							}}
						>
							<View style={styles.spacedApartContainer}>
								<View>
									<View
										style={styles.chatPreviewImageContainer}
									>
										<Image
											style={styles.chatPreviewIcon}
											source={{
												uri: doctor.profilePicture,
											}}
										/>
									</View>
								</View>
								<Text style={styles.chatPreviewName}>
									{formatName(
										doctor.firstName + " " + doctor.lastName
									)}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default DoctorsList;
