import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { makeApiCall } from "../../API/api";
import { HTTP_PUT, UPDATE_DOCTOR_VERIFICATION } from "../../API/apiTypes";
import MediaModal, { ModalType } from "../../Components/Modal/MediaModal";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";
import { formatFullDate } from "../../Utils/FormatTime/formatTime";
import { showToast } from "../../Utils/Toast";
import { ModalMediaType } from "../Chat/ChatMedia";

const DoctorDetails = ({ route }) => {
	const { doctor } = route.params;
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [doctorDetails, setDoctorDetails] = useState(doctor);
	const [modalProperties, setModalProperties] = useState<ModalType>(null);
	const [media, setMedia] = useState<ModalMediaType[]>([]);

	const goBack = () => {
		navigation.goBack();
	};

	const handleModalState = (media: ModalMediaType) => {
		const { name, type, content } = media;

		setModalProperties({
			name,
			type,
			content,
			modalActive: true,
			removeModal,
		});
	};

	const removeModal = () => {
		setModalProperties(null);
	};

	useEffect(() => {
		const allMedia: ModalMediaType[] = [];

		doctor.professionalDetails.medicalDocuments.forEach((document) => {
			const imageParts = document.split(".");
			const extension = imageParts[imageParts.length - 1];

			allMedia.push({
				content: document,
				name: `rn/Medical Document - ${formatName(
					doctor.firstName + " " + doctor.lastName
				)}-${Math.floor(Math.random() * 1000)}.${extension}`,
				type: "Image",
			});
		});

		setMedia(allMedia);
	}, []);

	const changeVerification = async () => {
		const apiResponse = await makeApiCall({
			endpoint: UPDATE_DOCTOR_VERIFICATION,
			httpAction: HTTP_PUT,
			queryParams: [doctor.userId],
			auth: true,
			body: { verification: !doctorDetails.verified },
		});

		if (apiResponse.ok) {
			setDoctorDetails({
				...doctorDetails,
				verified: !doctorDetails.verified,
			});
			showToast("success", `Verification successfully changed`);
		}
	};

	return (
		<View style={styles.fullContainer}>
			{modalProperties && (
				<MediaModal
					name={modalProperties.name}
					content={modalProperties.content}
					type={modalProperties.type}
					modalActive={modalProperties.modalActive}
					removeModal={removeModal}
				/>
			)}

			<View style={styles.pageHeader}>
				<View style={styles.pageHeaderNavigation}>
					<TouchableOpacity onPress={goBack}>
						<BackIcon size={20} color={colors.primaryRed} />
					</TouchableOpacity>

					<Text style={styles.pageHeaderText}>
						Details for :{" "}
						{formatName(doctor.firstName + " " + doctor.lastName)}
					</Text>
				</View>
			</View>

			<View style={{ paddingHorizontal: dimens.medium }}>
				<View
					style={{
						...styles.profileInfoContainer,
						marginBottom: -dimens.medium,
					}}
				>
					<View style={styles.profileInfoImageContainer}>
						<Image
							style={styles.profileInfoImage}
							source={{
								uri: doctor.profilePicture,
							}}
						/>
					</View>

					<View style={styles.profileInfoUserContainer}>
						<Text style={styles.profileInfoName}>
							{formatName(
								doctor.firstName + " " + doctor.lastName
							)}
						</Text>

						{doctor.bio ? (
							<Text style={styles.profileInfoBio}>
								{doctor.bio}
							</Text>
						) : null}

						<View style={styles.profileInfoFlexContainer}>
							<Text style={styles.profileAdditionalInfo}>
								Created At: {formatFullDate(doctor.createdAt)}
							</Text>
						</View>

						<View style={styles.profileInfoFlexContainer}>
							<Text style={styles.profileAdditionalInfo}>
								Expertise:{" "}
								{doctor.professionalDetails.expertise}
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					style={{
						...styles.blueButtonContainer,
						width: "100%",
						marginBottom: dimens.large,
					}}
					onPress={changeVerification}
				>
					<Text style={styles.blueButton}>
						{doctorDetails.verified ? "Verified" : "Not Verified"}
					</Text>
				</TouchableOpacity>

				<View>
					<Text style={styles.profileInfoName}>
						Medical Documents
					</Text>
				</View>

				<View style={{ ...styles.rowStartContainer, flexWrap: "wrap" }}>
					{media.map((document) => (
						<TouchableOpacity
							onPress={() => {
								handleModalState(document);
							}}
							key={document.content}
							style={{
								width: dimens.xxLarge * 3,
								height: dimens.xxLarge * 3,
								marginRight: dimens.medium,
							}}
						>
							<Image
								style={styles.modalImage}
								source={{ uri: document.content }}
							></Image>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</View>
	);
};

export default DoctorDetails;
