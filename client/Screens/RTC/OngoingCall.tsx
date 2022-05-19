import React from "react";
import { StatusBar, Text, View } from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BorderlessCrossIcon } from "../../Styles/SVG/Svg";

const OngoingCall = () => {
	return (
		<View style={styles.fullContainer}>
			<StatusBar translucent backgroundColor="transparent" />

			<View style={styles.remoteVideoPreviewContainer}></View>

			<View style={styles.localVideoPerviewContainer}></View>

			<View
				style={{
					...styles.callScreenIconContainer,
					...styles.allCenteredContainer,
				}}
			>
				<View
					style={{
						...styles.allCenteredContainer,
						...styles.callScreenIconBackground,
					}}
				>
					<BorderlessCrossIcon
						size={30}
						color={colors.primaryWhite}
					/>
				</View>
			</View>
		</View>
	);
};

export default OngoingCall;
