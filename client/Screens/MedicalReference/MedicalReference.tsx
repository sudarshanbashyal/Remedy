import React, { useState } from "react";
import {
	ScrollView,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_MEDICAL_REFERENCE, HTTP_GET } from "../../API/apiTypes";
import BottomNavigationBar from "../../Components/BottomNavigationBar";
import NoData from "../../Components/Feedbacks/NoData";
import ReferenceList from "../../Components/MedicalReference/ReferenceList";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { SearchIcon } from "../../Styles/SVG/Svg";

export interface DrugPreviewType {
	genericName: string;
	productType: string;
	rxcui?: number;
	route: string;
	raw: string;
}

const MedicalReference = () => {
	const [drugName, setDrugName] = useState<string>("");
	const [drugs, setDrugs] = useState<DrugPreviewType[]>([]);

	const [searched, setSearched] = useState<boolean>(false);

	const handleFileNameChange = (e: any) => {
		const { text } = e.nativeEvent;
		setDrugName(text);
	};

	const handleDrugSearch = async () => {
		const apiResponse = await makeApiCall({
			endpoint: GET_MEDICAL_REFERENCE,
			httpAction: HTTP_GET,
			queryParams: [drugName],
		});

		if (apiResponse.ok) {
			const { data } = apiResponse;

			checkFDAStatus(data);
		}

		setSearched(true);
	};

	const checkFDAStatus = (drugs: any) => {
		const fdaDrugs: DrugPreviewType[] = [];

		drugs.forEach((drug: any) => {
			if (drug.openfda) {
				const {
					openfda: { generic_name, product_type, route, rxcui },
				} = drug;

				fdaDrugs.push({
					genericName: generic_name[0],
					productType: product_type[0],
					route: route[0],
					rxcui: (rxcui && rxcui[0]) || null,
					raw: drug,
				});
			}
		});

		setDrugs(fdaDrugs);
	};

	return (
		<View style={styles.fullContainer}>
			<ScrollView style={styles.paddedContainer}>
				<Text style={styles.mainScreenTitle}>Drug References</Text>

				<View style={styles.searchContainer}>
					<TextInput
						placeholder="Drug References"
						placeholderTextColor={colors.opaqueWhite}
						style={{
							...styles.inputStyle,
							width: "85%",
							marginTop: dimens.medium,
						}}
						value={drugName}
						onChange={(e) => {
							handleFileNameChange(e);
						}}
					/>

					<TouchableOpacity onPress={handleDrugSearch}>
						<SearchIcon color={colors.primaryWhite} size={24} />
					</TouchableOpacity>
				</View>

				{searched && drugs.length === 0 && <NoData />}

				<View style={{ marginTop: dimens.medium }}>
					{drugs.map((drug: DrugPreviewType, index: number) => (
						<ReferenceList key={index} drug={drug} />
					))}
				</View>
			</ScrollView>

			<BottomNavigationBar />
		</View>
	);
};

export default MedicalReference;
