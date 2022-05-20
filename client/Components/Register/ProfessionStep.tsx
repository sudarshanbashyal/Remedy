import React, { useState } from "react";
import {
	View,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from "react-native";
import {
	Asset,
	ImagePickerResponse,
	launchImageLibrary,
} from "react-native-image-picker";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { CancelIcon } from "../../Styles/SVG/Svg";
import Errors from "../Feedbacks/Errors";
import { RegistrationStepProp } from "./ProfileStep";

const ProfessionStep = ({
	userData,
	handleChange,
	errors,
	setErrors,
	handleDocumentImages,
}: RegistrationStepProp) => {
	const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

	const handleImageUpload = async () => {
		try {
			const imageResponse: ImagePickerResponse = await launchImageLibrary(
				{
					mediaType: "photo",
					includeBase64: true,
					selectionLimit: 3,
				}
			);

			if (!imageResponse.didCancel) {
				let imageAssets: Asset[] = imageResponse.assets;
				if (imageAssets.length > 3) {
					imageAssets.splice(3);
					ToastAndroid.show(
						"Only added 3 images",
						ToastAndroid.SHORT
					);
				}

				setSelectedImages(imageAssets);
				handleDocumentImages(imageAssets);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const removeImage = (position: number) => {
		const newList: Asset[] = selectedImages.filter(
			(_, index) => index !== position
		);

		setSelectedImages(newList);
		handleDocumentImages(newList);
	};

	return (
		<View>
			<Text style={styles.loginTitle}>Professsion Details</Text>
			{errors.length > 0 && <Errors errors={errors} />}

			<TextInput
				value={userData?.expertise}
				onChange={(e) => {
					handleChange(e.nativeEvent.text, "expertise");
				}}
				placeholder="Expertise"
				style={styles.inputStyle}
				placeholderTextColor={colors.opaqueWhite}
			/>

			<TouchableOpacity
				style={styles.medicalDocumentsContainer}
				onPress={selectedImages[0] ? () => {} : handleImageUpload}
			>
				{!selectedImages[0] ? (
					<Text style={styles.documentContainerPlaceholder}>
						Upload Your Medical Certifications
					</Text>
				) : (
					selectedImages.map((image, index) => (
						<View key={index} style={styles.documentImageContainer}>
							<View style={styles.chatInputImageContainer}>
								<Image
									style={styles.documentImage}
									source={{ uri: image?.uri || null }}
								/>

								<TouchableOpacity
									style={styles.documentImageRemove}
									onPress={() => {
										removeImage(index);
									}}
								>
									<CancelIcon
										color={colors.primaryRed}
										size={34}
									/>
								</TouchableOpacity>
							</View>
						</View>
					))
				)}
			</TouchableOpacity>
		</View>
	);
};

export default ProfessionStep;
