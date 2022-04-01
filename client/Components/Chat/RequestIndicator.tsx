import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getIncomingRequests } from "../../API/api";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { MailIcon } from "../../Styles/SVG/Svg";

const RequestIndicator = () => {
	const [requestsNo, setRequestsNo] = useState<null | number>(null);

	useEffect(() => {
		// get message requests
		(async () => {
			const apiResponse = await getIncomingRequests();

			if (apiResponse.ok) {
				setRequestsNo(apiResponse.data.length);
			}
		})();
	}, []);

	if (!requestsNo) return null;

	return (
		<TouchableOpacity style={{ ...styles.rowStartContainer, marginTop: 0 }}>
			<MailIcon size={24} color={colors.opaqueWhite} />

			<View style={styles.requestIndicatorTextContainer}></View>
		</TouchableOpacity>
	);
};

export default RequestIndicator;
