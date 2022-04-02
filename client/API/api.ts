import { RequestStatusType } from "../Components/Chat/DoctorRequestItem";
import { LoginType } from "../Screens/Authentication/LoginScreen";
import { RegistrationType } from "../Screens/Authentication/RegisterScreen";
import { AccountSettingsType } from "../Screens/Profile/AccountSettings";
import { UserProfileType } from "../Screens/Profile/ProfileSettings";
import { MedicineDataType } from "../Screens/Schedule/ScheduleDetails";
import { getUserToken } from "../Utils/AsyncStorage/asyncStorage";
import { showToast } from "../Utils/Toast";

export const API_URL = "http://192.168.1.69:3000";

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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		return null;
	}
};

export const updateUserAccount = async (
	accountData: AccountSettingsType
): Promise<any> => {
	try {
		const response = await fetch(`${API_URL}/updateUserAccount`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
			body: JSON.stringify(accountData),
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.error(error);
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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		return null;
	}
};

export const analyzeMessageIntent = async (message: string) => {
	try {
		const response = await fetch(`${API_URL}/analyzeMessageIntent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});

		const data = await response.json();
		if (data.ok) {
			return data;
		}

		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const reportSymptomSimilarity = async (symptom: string) => {
	try {
		const response = await fetch(`${API_URL}/reportSymptomSimilarity`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ symptom }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getSimilarSymptoms = async (
	symptoms: number[],
	dob: number,
	gender: string
) => {
	try {
		const response = await fetch(`${API_URL}/getSimilarSymptoms`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ symptoms, dob, gender }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getDiagnosis = async (
	symptoms: number[],
	dob: number,
	gender: string
) => {
	try {
		const response = await fetch(`${API_URL}/getDiagnosis`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ symptoms, dob, gender }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getDoctors = async (name: string) => {
	try {
		const response = await fetch(`${API_URL}/getDoctors`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
			body: JSON.stringify({ name }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const addMessageRequest = async (receivingUser: string) => {
	try {
		const response = await fetch(`${API_URL}/addMessageRequest`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
			body: JSON.stringify({ receivingUser }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		return null;
	}
};

export const getIncomingRequests = async () => {
	try {
		const response = await fetch(`${API_URL}/getIncomingRequests`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${await getUserToken()}`,
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		return null;
	}
};

export const changeRequestStatus = async (
	requestId: string,
	status: RequestStatusType
) => {
	try {
		const response = await fetch(
			`${API_URL}/changeRequestStatus/${requestId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: `bearer ${await getUserToken()}`,
				},
				body: JSON.stringify({
					status,
				}),
			}
		);

		const data = await response.json();
		return data;
	} catch (error) {
		return null;
	}
};
