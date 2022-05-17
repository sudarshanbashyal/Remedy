import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../Styles/styles";
import { BackIcon, PhoneIcon, VideoIcon, MoreIcon } from "../../Styles/SVG/Svg";
import { colors } from "../../Styles/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../Stacks/RootStack";
import { makeApiCall } from "../../API/api";
import { GET_VOXIMPLANT_USERNAME, HTTP_GET } from "../../API/apiTypes";

const ChatHeader = ({
	chatId,
	messageWith,
	chatbot,
	recipentId,
}: {
	chatId: string;
	messageWith: string;
	chatbot: string;
	recipentId: string;
}) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [voxUsername, setVoxUsername] = useState<string>(null);

	const goBack = () => {
		navigation.goBack();
	};

	const goToMedia = () => {
		navigation.navigate("ChatMedia", {
			chatId,
		});
	};

	const outgoingCall = () => {
		navigation.navigate("OutgoingCall", {
			isIncomingCall: false,
			username: voxUsername,
			fullName: messageWith,
		});
	};

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_VOXIMPLANT_USERNAME,
				httpAction: HTTP_GET,
				queryParams: [recipentId],
			});

			if (apiResponse.ok) {
				const { voximplantUsername } = apiResponse.data;
				setVoxUsername(voximplantUsername);
			}
		})();
	}, []);

	return (
		<View style={styles.pageHeader}>
			<View style={styles.pageHeaderNavigation}>
				<TouchableOpacity onPress={goBack}>
					<BackIcon size={20} color={colors.primaryRed} />
				</TouchableOpacity>

				<Text style={styles.pageHeaderText}>{messageWith}</Text>
			</View>

			{!chatbot && (
				<View style={styles.pageHeaderIcons}>
					<TouchableOpacity onPress={outgoingCall}>
						<VideoIcon size={28} color={colors.primaryWhite} />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.pageHeaderIcon}
						onPress={goToMedia}
					>
						<MoreIcon size={24} color={colors.primaryRed} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ChatHeader;
