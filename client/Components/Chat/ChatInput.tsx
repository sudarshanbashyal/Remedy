import React, { SetStateAction, Dispatch, useEffect, useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	Text,
} from "react-native";
import {
	Asset,
	ImagePickerResponse,
	launchImageLibrary,
} from "react-native-image-picker";
import DocumentPicker, {
	DocumentPickerResponse,
} from "react-native-document-picker";
import {
	FilePreviewType,
	ImagePreviewType,
} from "../../Screens/Chat/ChatScreen";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import {
	CancelIcon,
	FileIcon,
	ImageIcon,
	PlusOutlineIcon,
	SendIcon,
} from "../../Styles/SVG/Svg";
import fetchBlob from "rn-fetch-blob";
import { formatText } from "../../Utils/FormatText/formatText";

const ChatInput = ({
	keyboardOffset,
	text,
	handleChat,
	setText,
	imageInfo,
	setImageInfo,
	fileInfo,
	setFileInfo,
	inputActive,
	setInputActive,
}: {
	keyboardOffset: number;
	text: string;
	setText: any;
	handleChat: any;
	imageInfo: ImagePreviewType | null;
	setImageInfo: Dispatch<SetStateAction<ImagePreviewType | null>>;
	fileInfo: FilePreviewType | null;
	setFileInfo: Dispatch<SetStateAction<FilePreviewType | null>>;
	inputActive: boolean;
	setInputActive: Dispatch<SetStateAction<boolean>>;
}) => {
	const [imagePreviewStyling, setImagePreviewStyling] = useState(
		styles.chatInput
	);

	const handleImagePreview = async () => {
		try {
			const imageResponse: ImagePickerResponse = await launchImageLibrary(
				{
					mediaType: "photo",
					includeBase64: true,
				}
			);

			if (!imageResponse.didCancel) {
				const imageAsset: Asset = imageResponse.assets[0];

				setImageInfo({
					base64: imageAsset.base64,
					uri: imageAsset.uri,
					fileName: imageAsset.fileName,
				});

				setText("");
				setInputActive(true);
				handleAttachmentPreviewStyling();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleAttachmentPreviewStyling = () => {
		const additionalStyles = StyleSheet.create({
			expandedInput: {
				height: 150,
			},
		});

		setImagePreviewStyling({
			...styles.chatInput,
			...additionalStyles.expandedInput,
		});
	};

	const removeAttachmentPreview = () => {
		setImagePreviewStyling(styles.chatInput);
		setInputActive(false);
		setImageInfo(null);
		setFileInfo(null);
	};

	const handleFilePreview = async () => {
		try {
			const res: DocumentPickerResponse[] = await DocumentPicker.pick({
				allowMultiSelection: false,
				type: [
					DocumentPicker.types.doc,
					DocumentPicker.types.docx,
					DocumentPicker.types.ppt,
					DocumentPicker.types.pptx,
					DocumentPicker.types.csv,
				],
			});
			console.log(res[0]);

			const filePath = res[0].uri;
			const fileContents = await fetchBlob.fs.readFile(
				filePath,
				"base64"
			);

			setFileInfo({
				base64: fileContents,
				fileName: res[0].name,
				fileExtension: res[0].type,
			});

			setText("");
			setInputActive(true);
			handleAttachmentPreviewStyling();
		} catch (error) {
			console.log(error);
		}
	};

	const handleTextChange = (e) => {
		const { text } = e.nativeEvent;
		setText(text);
	};

	useEffect(() => {
		if (!inputActive) {
			removeAttachmentPreview();
		}
	}, [inputActive]);

	useEffect(() => {
		if (text.length > 0) {
			setInputActive(true);
			return;
		}

		setInputActive(false);
	}, [text]);

	return (
		<View style={{ ...styles.chatInputContainer, bottom: keyboardOffset }}>
			{!inputActive && (
				<View style={styles.chatInputIconContainer}>
					<View style={{ marginRight: 10 }}>
						<TouchableOpacity onPress={handleImagePreview}>
							<ImageIcon size={24} color={colors.opaqueWhite} />
						</TouchableOpacity>
					</View>
					<View style={{ marginRight: 10 }}>
						<TouchableOpacity onPress={handleFilePreview}>
							<PlusOutlineIcon
								size={24}
								color={colors.opaqueWhite}
							/>
						</TouchableOpacity>
					</View>
				</View>
			)}

			<TextInput
				value={text}
				onChange={(e) => {
					handleTextChange(e);
				}}
				multiline={true}
				style={imagePreviewStyling}
				editable={!imageInfo && !fileInfo}
				selectTextOnFocus={!imageInfo && !fileInfo}
			/>

			{imageInfo && (
				<View style={styles.chatInputPreviewContainer}>
					<View style={styles.chatInputImageContainer}>
						<Image
							style={styles.chatInputImage}
							source={{ uri: imageInfo?.uri || null }}
						/>
					</View>

					<TouchableOpacity
						onPress={removeAttachmentPreview}
						style={styles.chatImageRemove}
					>
						<CancelIcon color={colors.primaryRed} size={34} />
					</TouchableOpacity>
				</View>
			)}

			{fileInfo && (
				<View style={styles.chatInputPreviewContainer}>
					<View style={styles.chatInputFileContainer}>
						<FileIcon size={50} color={colors.opaqueWhite} />
						<Text style={styles.chatInputFileName}>
							{formatText(fileInfo.fileName, 20)}
						</Text>
					</View>

					<TouchableOpacity
						onPress={removeAttachmentPreview}
						style={styles.chatImageRemove}
					>
						<CancelIcon color={colors.primaryRed} size={34} />
					</TouchableOpacity>
				</View>
			)}

			{inputActive && (
				<View style={{ marginLeft: 10 }}>
					<TouchableOpacity onPress={handleChat}>
						<SendIcon size={26} color={colors.primaryRed} />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ChatInput;
