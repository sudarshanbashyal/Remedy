import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserToken = async () => {
	try {
		const token = await AsyncStorage.getItem("token");

		return token || null;
	} catch (error) {
		return null;
	}
};

export const storeUserToken = async (token: string) => {
	try {
		await AsyncStorage.setItem("token", token);
	} catch (error) {
		console.log(error);
	}
};

export const removeUserToken = async () => {
	try {
		await AsyncStorage.removeItem("token");
	} catch (error) {
		console.log(error);
	}
};
