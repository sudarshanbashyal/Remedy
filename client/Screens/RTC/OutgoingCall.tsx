import React, { useEffect, useState, useRef } from "react";
import {
	Image,
	StatusBar,
	Text,
	View,
	PermissionsAndroid,
	TouchableOpacity,
} from "react-native";
import { colors } from "../../Styles/Colors";
import styles from "../../Styles/styles";
import { BorderlessCrossIcon } from "../../Styles/SVG/Svg";
import { Voximplant } from "react-native-voximplant";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackType } from "../../Stacks/RootStack";
import { Overlay } from "react-native-maps";

const OutgoingCall = ({ route }) => {
	let incomingCall, isIncomingCall, receivingUserName, fullName;

	if (route && route.params) {
		if (route.params.isIncomingCall) {
			incomingCall = route.params.call;
		} else {
			receivingUserName = route.params.username;
			fullName = route.params.fullName;
		}

		isIncomingCall = route.params.isIncomingCall;
	}

	const navigation = useNavigation<NavigationProp<RootStackType>>();

	const [permissionsGranted, setPermissionsGranted] =
		useState<boolean>(false);

	const [callStatus, setCallStatus] = useState<string>("Calling");
	const [localVideoStreamId, setLocalVideoStreamId] = useState<any>(null);
	const [remoteVideoStreamId, setRemoteVideoStreamId] = useState<any>(null);
	const [actionsHidden, setActionsHidden] = useState<boolean>(false);

	// get instance
	const voximplant = Voximplant.getInstance();
	const call = useRef<any>(incomingCall);
	const endpoint = useRef(null);

	const hangUp = () => {
		call.current.hangup();
	};

	useEffect(() => {
		(async () => {
			const permissions = [
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
				PermissionsAndroid.PERMISSIONS.CAMERA,
			];

			const permissionGranted = await PermissionsAndroid.requestMultiple(
				permissions
			);

			const audioPermission =
				permissionGranted[
					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
				] === "granted";
			const cameraPermission =
				permissionGranted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
				"granted";

			if (audioPermission && cameraPermission) {
				setPermissionsGranted(true);
			}
		})();
	}, []);

	useEffect(() => {
		// initate call
		if (!permissionsGranted) return;

		const callSettings = {
			video: {
				sendVideo: true,
				receiveVideo: true,
			},
		};

		const makeCall = async () => {
			call.current = await voximplant.call(
				receivingUserName,
				callSettings
			);

			subscribeToCallEvent();
		};

		const answerCall = async () => {
			subscribeToCallEvent();
			console.log("answering call");

			// endpoint is already attached when answering a call
			endpoint.current = call.current.getEndpoints()[0];
			subscribeToEndpointEvent();

			call.current.answer(callSettings);
		};

		const subscribeToCallEvent = async () => {
			if (call.current) {
				call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
					if (
						callEvent.reason == "Decline" ||
						callEvent.reason == "Temporarily Unavailable"
					) {
						setCallStatus(
							callEvent.reason == "Decline"
								? "Call Declined"
								: "User Currently Unavailable"
						);
						setLocalVideoStreamId(null);
						setActionsHidden(true);

						setTimeout(() => {
							navigation.goBack();
						}, 2000);
					}
				});

				call.current.on(
					Voximplant.CallEvents.ProgressToneStart,
					(callEvent) => {
						setCallStatus("Ringing");
					}
				);

				call.current.on(
					Voximplant.CallEvents.Connected,
					(callEvent) => {
						setCallStatus("Connected");
					}
				);

				call.current.on(
					Voximplant.CallEvents.Disconnected,
					(callEvent) => {
						navigation.goBack();
					}
				);

				call.current.on(
					Voximplant.CallEvents.LocalVideoStreamAdded,
					(callEvent) => {
						setLocalVideoStreamId(callEvent.videoStream.id);
					}
				);

				call.current.on(
					Voximplant.CallEvents.EndpointAdded,
					(callEvent) => {
						endpoint.current = callEvent.endpoint;
						subscribeToEndpointEvent();
					}
				);
			}
		};

		const subscribeToEndpointEvent = async () => {
			endpoint.current.on(
				Voximplant.EndpointEvents.RemoteVideoStreamAdded,
				(endpointEvent) => {
					setRemoteVideoStreamId(endpointEvent.videoStream.id);
				}
			);
		};

		if (isIncomingCall) {
			answerCall();
		} else {
			makeCall();
		}

		// unsubscribe from events
		return () => {
			call.current.off(Voximplant.CallEvents.Failed);
			call.current.off(Voximplant.CallEvents.ProgressToneStart);
			call.current.off(Voximplant.CallEvents.Connected);
			call.current.off(Voximplant.CallEvents.Disconnected);
		};
	}, [permissionsGranted]);

	return (
		<View style={styles.fullContainer}>
			<StatusBar translucent backgroundColor="transparent" />

			{localVideoStreamId && (
				<View style={styles.localVideoPerviewContainer}>
					<Voximplant.VideoView
						showOnTop={true}
						videoStreamId={localVideoStreamId}
						style={{
							width: "100%",
							height: "100%",
							zIndex: 9999,
						}}
					/>
				</View>
			)}

			{remoteVideoStreamId && (
				<View style={styles.remoteVideoPreviewContainer}>
					<Voximplant.VideoView
						videoStreamId={remoteVideoStreamId}
						style={{ width: "100%", height: "100%" }}
					/>
				</View>
			)}

			{!remoteVideoStreamId && (
				<View style={{ width: "100%", height: "100%" }}>
					<Image
						style={styles.callBackgroundImage}
						source={require("../../assets/images/call-bg.jpg")}
					/>

					<Text style={styles.callScreenUserName}>{fullName}</Text>
					<Text style={styles.callScreenStatus}>{callStatus}...</Text>
				</View>
			)}

			{!actionsHidden && (
				<View
					style={{
						...styles.callScreenIconContainer,
						...styles.allCenteredContainer,
					}}
				>
					<TouchableOpacity
						onPress={hangUp}
						style={{
							...styles.allCenteredContainer,
							...styles.callScreenIconBackground,
						}}
					>
						<BorderlessCrossIcon
							size={30}
							color={colors.primaryWhite}
						/>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default OutgoingCall;
