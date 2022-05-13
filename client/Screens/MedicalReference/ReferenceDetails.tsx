import React, { useState, useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { RootStackType } from "../../Stacks/RootStack";
import { colors } from "../../Styles/Colors";
import styles, { dimens } from "../../Styles/styles";
import { BackIcon } from "../../Styles/SVG/Svg";
import { formatName } from "../../Utils/FormatName/formatName";
import { replaceSnakeCase } from "../../Utils/FormatText/formatText";

export interface DrugDetailsType {
	title: string;
	description: string;
}

const ReferenceDetails = ({ route }) => {
	const { genericName, rxcui, raw } = route.params;
	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [basicInfo, setBasicInfo] = useState<DrugDetailsType[]>([]);
	const [topics, setTopics] = useState<DrugDetailsType[]>([]);

	const goBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		const basics: DrugDetailsType[] = [];
		const topics: DrugDetailsType[] = [];

		for (let topic in raw.openfda) {
			basics.push({
				title: formatName(replaceSnakeCase(topic)),
				description: Array.isArray(raw.openfda[topic])
					? raw.openfda[topic][0]
					: raw.openfda[topic],
			});
		}

		for (let topic in raw) {
			if (topic.includes("table") || topic.includes("openfda")) {
				continue;
			}

			topics.push({
				title: formatName(replaceSnakeCase(topic)),
				description: Array.isArray(raw[topic])
					? raw[topic][0]
					: raw[topic],
			});
		}

		setBasicInfo(basics);
		setTopics(topics);
	}, []);

	return (
		<View style={styles.fullContainer}>
			<ScrollView>
				<View style={styles.pageHeader}>
					<View style={styles.pageHeaderNavigation}>
						<TouchableOpacity onPress={goBack}>
							<BackIcon size={20} color={colors.primaryRed} />
						</TouchableOpacity>

						<Text style={styles.pageHeaderText}>
							{formatName(genericName)}
						</Text>
					</View>
				</View>

				<View>
					{basicInfo.map((topic) => (
						<View style={styles.referenceDetailsContainer}>
							<Text>
								<Text style={{ ...styles.referenceBasicTitle }}>
									{topic.title}:{"  "}
								</Text>

								<Text style={styles.referenceBasicDescription}>
									{topic.description}
								</Text>
							</Text>
						</View>
					))}
				</View>

				<View style={styles.referenceInfoContainer}>
					{topics.map((topic) => (
						<View
							style={{
								marginBottom: dimens.medium,
								paddingHorizontal: dimens.medium,
							}}
						>
							<Text style={styles.referenceInfoTitle}>
								{topic.title}
							</Text>
							<Text style={styles.referenceBasicDescription}>
								{topic.description}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default ReferenceDetails;
