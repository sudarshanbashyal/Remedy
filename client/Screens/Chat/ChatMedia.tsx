import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { makeApiCall } from "../../API/api";
import { GET_CHAT_MEDIA, HTTP_GET } from "../../API/apiTypes";
import MediaModal, { ModalType } from "../../Components/Modal/MediaModal";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon, SearchIcon } from "../../Styles/SVG/Svg";
import { formatText } from "../../Utils/FormatText/formatText";
import { showToast } from "../../Utils/Toast";

export interface ModalMediaType {
	content: string;
	name: string;
	date?: Date;
	type: string;
}

const ChatMedia = ({ route }) => {
	const { chatId } = route.params;

	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const goBack = () => {
		navigation.goBack();
	};

	const [modalProperties, setModalProperties] = useState<ModalType>(null);

	const [fileName, setFileName] = useState<string>("");

	const [medias, setMedias] = useState<ModalMediaType[]>([]);
	const [renderMedias, setRenderMedias] = useState<ModalMediaType[]>([]);

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

	const handleFileNameChange = (e: any) => {
		const { text } = e.nativeEvent;
		setFileName(text);
	};

	const getExtension = (name: string) => {
		const fileName = name.split("/")[1];
		return fileName.split(".")[1];
	};

	const handleSearch = () => {
		const filteredMedias: ModalMediaType[] = medias.filter(
			(media: ModalMediaType) =>
				media.name.toLowerCase().includes(fileName.toLowerCase())
		);

		setRenderMedias(filteredMedias);
	};

	useEffect(() => {
		(async () => {
			const apiResponse = await makeApiCall({
				endpoint: GET_CHAT_MEDIA,
				httpAction: HTTP_GET,
				auth: true,
				queryParams: [chatId],
			});

			if (apiResponse.ok) {
				const { data } = apiResponse;
				setMedias(data);
				setRenderMedias(data);
			} else {
				showToast("error", "Could not retrieve media.");
			}
		})();
	}, []);

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
						Shared Files and Media
					</Text>
				</View>
			</View>

			<View style={styles.chatMediaContainer}>
				<View style={styles.searchContainer}>
					<TextInput
						placeholder="Search by Name of Extension"
						placeholderTextColor={colors.opaqueWhite}
						style={{
							...styles.inputStyle,
							width: "85%",
						}}
						value={fileName}
						onChange={(e) => {
							handleFileNameChange(e);
						}}
					/>

					<TouchableOpacity onPress={handleSearch}>
						<SearchIcon color={colors.primaryWhite} size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.chatFilesLayoutContainer}>
					{renderMedias.map((media: ModalMediaType) => (
						<TouchableOpacity
							onPress={() => {
								handleModalState(media);
							}}
							key={media.name}
							style={styles.chatFilesContainer}
						>
							{media.type === "Image" ? (
								<View style={styles.chatFilesImageContainer}>
									<Image
										style={styles.chatFileImages}
										source={{ uri: media.content }}
									/>
								</View>
							) : (
								<View style={styles.chatFilesOtherContainer}>
									<Text style={styles.chatFileExtension}>
										.{getExtension(media.name)}
									</Text>
								</View>
							)}

							<Text style={styles.chatFileName}>
								{formatText(media.name.split("/")[1], 15)}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</View>
	);
};

export default ChatMedia;
