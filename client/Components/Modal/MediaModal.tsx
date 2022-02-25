import React from "react";
import { Dimensions, View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "../../Styles/styles";
import { handleDownload } from "../../Utils/Download/downloadFile";
import { formatText } from "../../Utils/FormatText/formatText";

export interface MediaModalType {
	name: string;
	content: string;
	type: string;
	modalActive: boolean;
	removeModal: () => void;
}

const MediaModal = ({
	name,
	content,
	type,
	modalActive,
	removeModal,
}: MediaModalType) => {
	const getRealFileName = () => {
		return name.split("/")[1];
	};

	return (
		<Modal
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			onBackdropPress={removeModal}
			isVisible={modalActive}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalMediaInformationContainer}>
					<Text style={styles.modalText}>
						{formatText(getRealFileName(), 40)}
					</Text>
				</View>

				<View style={styles.modalImagePreview}>
					<Image
						style={{
							...styles.modalImage,
							...(type === "File" && {
								height: "70%",
								width: "70%",
							}),
						}}
						source={{
							uri:
								type === "Image"
									? content
									: "https://icons-for-free.com/iconfiles/png/512/file+icon-1320087274221188067.png",
						}}
					/>
					{type === "File" && (
						<Text style={{ ...styles.modalText, marginTop: 10 }}>
							Cannot preview file of this format.
						</Text>
					)}
				</View>

				<TouchableOpacity
					onPress={() => {
						handleDownload({ name, content });
					}}
				>
					<View
						style={{ ...styles.blueButtonContainer, marginTop: 10 }}
					>
						<Text style={styles.blueButton}>
							{type === "Image"
								? "Download Image"
								: "Download File"}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default MediaModal;
