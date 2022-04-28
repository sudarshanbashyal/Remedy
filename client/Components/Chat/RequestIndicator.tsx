import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_INCOMING_REQUESTS, HTTP_POST } from "../../API/apiTypes";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { MailIcon } from "../../Styles/SVG/Svg";

const RequestIndicator = () => {
	const [requestsNo, setRequestsNo] = useState<null | number>(null);
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	useEffect(() => {
		// get message requests
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_INCOMING_REQUESTS,
				httpAction: HTTP_POST,
				auth: true,
			});

			if (apiResponse.ok) {
				setRequestsNo(apiResponse.data.length);
			}
		})();
	}, []);

	if (!requestsNo) return null;

	return (
		<TouchableOpacity
			style={{ ...styles.rowStartContainer, marginTop: 0 }}
			onPress={() => {
				navigation.navigate("RequestScreen");
			}}
		>
			<MailIcon size={24} color={colors.opaqueWhite} />

			<View style={styles.requestIndicatorTextContainer}></View>
		</TouchableOpacity>
	);
};

export default RequestIndicator;
