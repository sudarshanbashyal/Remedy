import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { DoctorRequestItemType } from "../../Screens/Chat/DoctorRequestScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { CrossIcon, TickIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";

const ACCEPTED_TYPE = "Accepted";
const REJECTED_TYPE = "Rejected";
const PENDING_TYPE = "Pending";

export type RequestStatusType =
	| typeof ACCEPTED_TYPE
	| typeof REJECTED_TYPE
	| typeof PENDING_TYPE;

const DoctorRequestItem = ({
	patient,
	handleRequestResponse,
}: {
	patient: DoctorRequestItemType;
	handleRequestResponse: (
		requestId: string,
		status: RequestStatusType
	) => void;
}) => {
	return (
		<View style={{ marginBottom: 16, marginTop: 16 }}>
			<View style={styles.spacedApartContainer}>
				<View style={{ ...styles.rowStartContainer, marginTop: 0 }}>
					<View style={styles.chatPreviewImageContainer}>
						<Image
							style={styles.chatPreviewIcon}
							source={{ uri: patient.profilePicture }}
						/>
					</View>

					<View>
						<Text style={styles.chatPreviewName}>
							{formatName(
								`${patient.firstName} ${patient.lastName}`
							)}
						</Text>
					</View>
				</View>

				<View style={styles.spacedApartContainer}>
					<TouchableOpacity
						style={{ marginRight: 8 }}
						onPress={() => {
							handleRequestResponse(
								patient.requestId,
								"Accepted"
							);
						}}
					>
						<TickIcon size={30} color={colors.primaryGreen} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							handleRequestResponse(
								patient.requestId,
								"Rejected"
							);
						}}
					>
						<CrossIcon size={30} color={colors.primaryRed} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default DoctorRequestItem;
