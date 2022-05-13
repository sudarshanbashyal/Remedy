import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";

const ReferenceDetails = ({ route }) => {
	const { genericName, rxcui } = route.params;
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const goBack = () => {
		navigation.goBack();
	};

	const getDrugDetails = async () => {};

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.pageHeader}>
					<View style={styles.pageHeaderNavigation}>
						<TouchableOpacity onPress={goBack}>
							<BackIcon size={20} color={colors.primaryRed} />
						</TouchableOpacity>

						<Text style={styles.pageHeaderText}>
							{formatName(genericName)}
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ReferenceDetails;
