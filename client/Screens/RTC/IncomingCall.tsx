import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Image, StatusBar, TouchableOpacity } from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { BorderlessCheckIcon, BorderlessCrossIcon } from "../../Styles/SVG/Svg";
import { Voximplant } from "react-native-voximplant";

const IncomingCall = ({ route }) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [caller, setCaller] = useState<string>("");

	const { call } = route.params;

	const declineCall = () => {
		call.decline();
	};

	const acceptCall = () => {
		navigation.navigate("OutgoingCall", {
			call,
			isIncomingCall: true,
		});
	};

	useEffect(() => {
		setCaller(call.getEndpoints()[0].displayName);

		call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
			navigation.goBack();
		});

		return () => {
			call.off(Voximplant.CallEvents.Disconnected);
		};
	}, []);

	return (
		<View style={styles.fullContainer}>
			<StatusBar translucent backgroundColor="transparent" />

			<Image
				style={styles.callBackgroundImage}
				source={require("../../assets/images/call-bg.jpg")}
			/>

			<Text style={styles.callScreenUserName}>{caller}</Text>
			<Text style={styles.callScreenStatus}>Incoming Calling...</Text>

			<View
				style={{
					...styles.callScreenIconContainer,
					...styles.allCenteredContainer,
				}}
			>
				<TouchableOpacity
					onPress={declineCall}
					style={{
						...styles.allCenteredContainer,
						...styles.callScreenIconBackground,
						marginRight: dimens.medium,
					}}
				>
					<BorderlessCrossIcon
						size={30}
						color={colors.primaryWhite}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={acceptCall}
					style={{
						...styles.allCenteredContainer,
						...styles.callScreenIconBackground,
						backgroundColor: colors.primaryGreen,
						marginLeft: dimens.medium,
					}}
				>
					<BorderlessCheckIcon
						size={30}
						color={colors.primaryWhite}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default IncomingCall;
