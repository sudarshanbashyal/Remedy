import React from "react";
import { View, Text } from "react-native";
import styles from "../../Styles/styles";

const Errors = ({ errors }: { errors: string[] }) => {
	return (
		<View style={styles.errorContainer}>
			{errors.map((error: string) => (
				<Text key={error} style={styles.errorText}>
					{error}
				</Text>
			))}
		</View>
	);
};

export default Errors;
