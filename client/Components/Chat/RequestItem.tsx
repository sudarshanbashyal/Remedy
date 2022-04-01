import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { RequestItemType } from "../../Screens/Chat/RequestScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { SendIcon, TickIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";
import { formatText } from "../../Utils/FormatText/formatText";

const RequestItem = ({
	doctor,
	requests,
	sendMessageRequest,
}: {
	doctor: RequestItemType;
	requests: any;
	sendMessageRequest: (receivingUser: string) => void;
}) => {
	return (
		<View style={{ marginBottom: 16, marginTop: 16 }}>
			<View style={styles.spacedApartContainer}>
				<View style={{ ...styles.rowStartContainer, marginTop: 0 }}>
					<View style={styles.chatPreviewImageContainer}>
						<Image
							style={styles.chatPreviewIcon}
							source={{ uri: doctor.profilePicture }}
						/>
					</View>

					<View>
						<Text style={styles.chatPreviewName}>
							{formatName(
								`${doctor.firstName} ${doctor.lastName}`
							)}
						</Text>

						<Text style={styles.doctorTitle}>
							{formatText("MBBS/MD something something", 20)}
						</Text>
					</View>
				</View>

				{requests[doctor.userId] ? (
					<TouchableOpacity>
						<TickIcon size={30} color={colors.primaryGreen} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => {
							sendMessageRequest(doctor.userId);
						}}
					>
						<SendIcon size={30} color={colors.opaqueWhite} />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default RequestItem;
