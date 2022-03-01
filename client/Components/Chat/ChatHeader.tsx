import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../Styles/styles";
import { BackIcon, PhoneIcon, VideoIcon, MoreIcon } from "../../Styles/SVG/Svg";
import { colors } from "../../Styles/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../Stacks/RootStack";

const ChatHeader = ({
	chatId,
	messageWith,
	chatbot,
}: {
	chatId: string;
	messageWith: string;
	chatbot: string;
}) => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const goBack = () => {
		navigation.goBack();
	};

	const goToMedia = () => {
		navigation.navigate("ChatMedia", {
			chatId,
		});
	};

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
					<TouchableOpacity>
						<PhoneIcon size={28} color={colors.primaryWhite} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.pageHeaderIcon}>
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
