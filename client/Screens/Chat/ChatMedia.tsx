import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BackIcon, SearchIcon } from "../../Styles/SVG/Svg";

interface MediaType {
	name: string;
	type: string;
	uri?: string;
	extension?: string;
}

const dbMedias: MediaType[] = [
	{
		name: "Image1.png",
		type: "image",
		uri: "https://i.kym-cdn.com/entries/icons/original/000/031/003/cover3.jpg",
	},
	{
		name: "Image2.png",
		type: "image",
		uri: "https://i.kym-cdn.com/entries/icons/original/000/031/003/cover3.jpg",
	},
	{
		name: "medical report.doc",
		type: "file",
		extension: "doc",
	},
	{
		name: "medical report 2.ppt",
		type: "file",
		extension: "ppt",
	},
	{
		name: "Image3.png",
		type: "image",
		uri: "https://i.kym-cdn.com/entries/icons/original/000/031/003/cover3.jpg",
	},
];

const ChatMedia = () => {
	const navigation = useNavigation<NavigationProp<RootStackType>>();
	const goBack = () => {
		navigation.goBack();
	};

	const [fileName, setFileName] = useState<string>("");
	const [medias, setMedias] = useState<MediaType[]>(dbMedias);

	const handleFileNameChange = (e: any) => {
		const { text } = e.nativeEvent;
		setFileName(text);
	};

	const handleSearch = () => {
		const keyword: string = fileName.toLowerCase();

		const newMedias: MediaType[] = dbMedias.filter(
			(media: MediaType) =>
				media.name.toLowerCase().includes(keyword) ||
				media.extension?.toLowerCase().includes(keyword)
		);

		setMedias(newMedias);
	};

	return (
		<View style={styles.fullContainer}>
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
				<View style={styles.chatMediaSearchContainer}>
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
					{medias.map((media: any, index: number) => (
						<View
							key={media.name}
							style={styles.chatFilesContainer}
						>
							{media.type === "image" ? (
								<View style={styles.chatFilesImageContainer}>
									<Image
										style={styles.chatFileImages}
										source={{ uri: media.uri }}
									/>
								</View>
							) : (
								<View style={styles.chatFilesOtherContainer}>
									<Text style={styles.chatFileExtension}>
										.{media.extension}
									</Text>
								</View>
							)}

							<Text style={styles.chatFileName}>
								{media.name}
							</Text>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

export default ChatMedia;
