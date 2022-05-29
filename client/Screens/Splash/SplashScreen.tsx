import React, { useRef, useEffect } from "react";
import { Image, View, Animated, Text } from "react-native";
import styles from "../../Styles/styles";

const SplashScreen = () => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<View style={styles.fullContainer}>
			<Animated.View style={styles.splashScreenContainer}>
				<Image
					style={styles.splashScreenLogo}
					source={require("../../assets/images/logo.png")}
				/>
				<Text style={styles.splashScreenText}>Remedy</Text>
			</Animated.View>
		</View>
	);
};

export default SplashScreen;
