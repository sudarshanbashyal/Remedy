import React from "react";
import { View, Text } from "react-native";
import styles from "../../Styles/styles";

const NoData = ({
	title,
	description,
}: {
	title?: string;
	description?: string;
}) => {
	return (
		<View style={styles.noMedicineContainer}>
			<Text style={styles.noDataTitle}>{title || "No Data"}</Text>
			<Text style={styles.noDataText}>
				{description ||
					"Hmmm, nothing to see here. Try either adding a medicine or filtering differently."}
			</Text>
		</View>
	);
};

export default NoData;
