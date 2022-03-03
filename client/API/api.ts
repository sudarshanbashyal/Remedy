import { LoginType } from "../Screens/Authentication/LoginScreen";
import { RegistrationType } from "../Screens/Authentication/RegisterScreen";
import { UserProfileType } from "../Screens/Profile/ProfileSettings";
import { MedicineDataType } from "../Screens/Schedule/ScheduleDetails";
import { getUserToken } from "../Utils/AsyncStorage/asyncStorage";
import { showToast } from "../Utils/Toast";

export const API_URL = "http://192.168.1.67:3000";

export const emailExists = async (email: string): Promise<boolean> => {
	try {
		const response = await fetch(`${API_URL}/checkEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();

		return data.emailExists;
	} catch (error) {
		console.log(error);
		return true;
	}
};

export const registerUser = async (
	userData: RegistrationType
): Promise<boolean> => {
	try {
		const response = await fetch(`${API_URL}/registerUser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (data.ok) {
			showToast("success", "Your account was successfully created.");
			return true;
		}
	} catch (error) {
		showToast(
			"error",
			"Your account could not be created. Pleaes try again."
		);
		return false;
	}
};

export const loginUser = async (userData: LoginType): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/loginUser`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
	}
};

export const fetchUser = async (token: string): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/fetchUser`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${token}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data.user;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const addMedicine = async (
	medicineData: MedicineDataType
): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/addMedicine`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
			body: JSON.stringify(medicineData),
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getMedicineList = async (): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/getMedicineList`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getMedicineDetails = async (medicineId: string): Promise<any> => {
	try {
		const response = await fetch(
			`${API_URL}/getMedicineDetails/${medicineId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `bearer ${await getUserToken()}`,
				},
			}
		);

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateMedicineDetails = async (
	medicineId: string,
	medicineData: MedicineDataType
): Promise<any> => {
	try {
		const response = await fetch(
			`${API_URL}/updateMedicine/${medicineId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: `bearer ${await getUserToken()}`,
				},
				body: JSON.stringify(medicineData),
			}
		);

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getFrequencies = async (): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/getFrequencies`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateUserProfile = async (
	userData: UserProfileType
): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/updateUserProfile`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getMessageList = async (): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/getMessageList`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getChatMessages = async (chatId: string): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/getChatMessages/${chatId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getChatMedia = async (chatId: string): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/getChatMedia/${chatId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
};
