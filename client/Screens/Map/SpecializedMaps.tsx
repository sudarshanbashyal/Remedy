import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../Styles/styles";
import Geolocation from "@react-native-community/geolocation";
import MapView, {
	MarkerAnimated,
	Polyline,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import { colors } from "../../Styles/Colors";
import { HamburgerIcon } from "../../Styles/SVG/Svg";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_LINK } from "../../Utils/keys";

interface LocationType {
	latitude: number | null;
	longitude: number | null;
}

const SpecializedMaps = ({ route }) => {
	const { hospitals, category } = route.params;

	const [userLocation, setUserLocation] = useState<LocationType>({
		latitude: null,
		longitude: null,
	});

	const [listExpanded, setListExpanded] = useState<boolean>(true);

	const [destinationName, setDestinationName] = useState<string>("");
	const [destinationLocation, setDestinationLocation] =
		useState<LocationType>({
			latitude: null,
			longitude: null,
		});
	const [wayPoints, setWayPoints] = useState<LocationType[]>([]);

	const changeDestination = (hospital: any) => {
		const [latitude, longitude] = hospital.coordinates.split(",");

		setDestinationLocation({
			latitude: +latitude,
			longitude: +longitude,
		});
		setDestinationName(hospital.name);
	};

	useEffect(() => {
		(async () => {
			if (
				!userLocation.latitude ||
				!userLocation.longitude ||
				!destinationLocation.longitude ||
				!destinationLocation.latitude
			)
				return;

			const coordinatesQuery = `${userLocation.longitude},${userLocation.latitude};${destinationLocation.longitude},${destinationLocation.latitude}`;
			const fullURL = `${MAPBOX_LINK}${coordinatesQuery}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`;

			const response = await fetch(fullURL);
			const data = await response.json();

			if (data.code.toLowerCase() == "ok") {
				const {
					geometry: { coordinates },
				} = data.routes[0];
				const allWayPoints = [];

				coordinates.forEach((coordinate: any) => {
					const [longitude, latitude] = coordinate;
					allWayPoints.push({
						longitude,
						latitude,
					});
				});

				setWayPoints(allWayPoints);
			}

			// animate when markers are placed
			if (mapRef.current) {
				mapRef.current.fitToElements();
			}
		})();
	}, [userLocation, destinationLocation]);

	// get user location and set initial destination
	useEffect(() => {
		Geolocation.getCurrentPosition((info) => {
			const {
				coords: { latitude, longitude },
			} = info;

			setUserLocation({ latitude: latitude, longitude: longitude });
		});

		// set initial destination location and coordinates
		changeDestination(hospitals[0]);
	}, []);

	const mapRef = useRef<any>();

	return (
		<View style={{ ...styles.fullContainer, position: "relative" }}>
			{listExpanded && (
				<View style={styles.hospitalListContainer}>
					<Text style={styles.hospitalCategoryTitle}>
						Hospitals for {category}
					</Text>

					<ScrollView>
						<Text style={styles.hospitalCategoryDescription}>
							We found {hospitals.length} hospitals related to{" "}
							{category}. Click on any of them to get navigation
							information.
						</Text>

						{hospitals.map((hospital: any, index: number) => (
							<TouchableOpacity
								onPress={() => {
									changeDestination(hospitals[index]);
								}}
								style={{
									...styles.hospitalCategoryEntryContainer,
									...(hospital.name === destinationName
										? styles.selectedHospitalContainer
										: {}),
								}}
							>
								<Text style={styles.hospitalCategoryEntryText}>
									{hospital.name}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			)}

			<View
				style={{
					height: listExpanded ? "50%" : "100%",
					position: "relative",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						setListExpanded(!listExpanded);
					}}
					style={styles.hospitalHamburgerContainer}
				>
					<HamburgerIcon size={24} color={colors.primaryWhite} />
				</TouchableOpacity>

				{userLocation.longitude && userLocation.latitude && (
					<MapView
						ref={mapRef}
						provider={PROVIDER_GOOGLE}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
						initialRegion={{
							...userLocation,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					>
						<MarkerAnimated
							identifier="location_marker"
							coordinate={userLocation}
							title="Your Location"
							description="You are here."
						/>

						{userLocation.latitude &&
							destinationLocation.latitude && (
								<Polyline
									strokeColor={colors.secondaryBlue}
									strokeWidth={3}
									coordinates={wayPoints}
								/>
							)}

						{destinationLocation.latitude &&
							destinationLocation.longitude && (
								<MarkerAnimated
									identifier="destination_marker"
									coordinate={destinationLocation}
									title={
										destinationName || "Your Destination."
									}
									description="Your Destination"
								/>
							)}
					</MapView>
				)}
			</View>
		</View>
	);
};

export default SpecializedMaps;
