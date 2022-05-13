import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrugPreviewType } from "../../Screens/MedicalReference/MedicalReference";
import { RootStackType } from "../../Stacks/RootStack";
import styles from "../../Styles/styles";
import { formatName } from "../../Utils/FormatName/formatName";
import { formatText } from "../../Utils/FormatText/formatText";

const ReferenceList = ({ drug }: { drug: DrugPreviewType }) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const navigate = () => {
		navigation.navigate("ReferenceDetails", {
			genericName: drug.genericName,
			rxcui: drug.rxcui,
		});
	};

	return (
		<TouchableOpacity onPress={navigate}>
			<View style={styles.referenceListContainer}>
				<Text style={styles.referenceGenericName}>
					{formatText(formatName(drug.genericName), 15)}
				</Text>

				<Text style={styles.referenceProductType}>
					{formatName(drug.productType)}
				</Text>
				<Text style={styles.referenceRoute}>Route: {drug.route}</Text>

				{drug.rxcui && (
					<Text style={styles.referenceRxcui}>{drug.rxcui}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default ReferenceList;
