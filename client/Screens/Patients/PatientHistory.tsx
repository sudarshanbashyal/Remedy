import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_PATIENT_FREQUENCIES, HTTP_GET } from "../../API/apiTypes";
import FrequencyDetails from "../../Components/Stats/FrequencyDetails";
import FrequencyGraph from "../../Components/Stats/FrequencyGraph";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { showToast } from "../../Utils/Toast";
import { FrequencyListType } from "../Stats/MedicineStats";

const PatientHistory = ({ route }) => {
	const { messageWith, recipentId } = route.params;

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goBack = () => {
		navigation.goBack();
	};

	const [frequencies, setFrequencies] = useState<FrequencyListType[]>([]);
	const [frequencyDetails, setFrequencyDetails] = useState<any>({});
	const [selectedMedicineId, setSelectedMedicineId] = useState<string>(null);

	useEffect(() => {
		(async () => {
			const allFrequencies: FrequencyListType[] = [];
			const allFrequencyDetails = {};

			const apiResponse = await makeApiCall({
				endpoint: GET_PATIENT_FREQUENCIES,
				httpAction: HTTP_GET,
				queryParams: [recipentId],
			});

			if (apiResponse.ok) {
				apiResponse.data.forEach((frequency: any) => {
					const frequencyDates = [];
					const frequencyValues = [];

					frequency.frequencies.forEach((val: any) => {
						frequencyDates.push(val.date);
						frequencyValues.push(val.frequencyPerWeek);

						const { medicineId, name } = val.medicine;

						// freqneucy details
						if (!allFrequencyDetails[medicineId]) {
							allFrequencyDetails[medicineId] = {
								name: name,
								details: [],
							};
						}

						allFrequencyDetails[medicineId].details = [
							...allFrequencyDetails[medicineId].details,

							{
								date: val.date,
								frequencyPerWeek: val.frequencyPerWeek,
								days: val.days,
							},
						];
					});

					allFrequencies.push({
						medicineName: frequency.name,
						medicineId: frequency.medicineId,
						dates: frequencyDates,
						frequencyValues: frequencyValues,
					});
				});

				setFrequencyDetails(allFrequencyDetails);
				setFrequencies(allFrequencies);
				return;
			}

			showToast("error", "Could not retrieve data");
		})();
	}, []);

	return (
		<View style={styles.fullContainer}>
			<View style={styles.pageHeader}>
				<View style={styles.pageHeaderNavigation}>
					<TouchableOpacity onPress={goBack}>
						<BackIcon size={20} color={colors.primaryRed} />
					</TouchableOpacity>

					<Text style={styles.pageHeaderText}>
						Medical History: {messageWith}
					</Text>
				</View>
			</View>

			<FrequencyGraph
				frequencies={frequencies}
				setSelectedMedicineId={setSelectedMedicineId}
			/>

			<FrequencyDetails
				selectedMedicineId={selectedMedicineId}
				frequencyDetails={frequencyDetails}
			/>
		</View>
	);
};

export default PatientHistory;
