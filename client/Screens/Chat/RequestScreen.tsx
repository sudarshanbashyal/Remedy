import React from "react";
import { useSelector } from "react-redux";
import { DOCTOR_TYPE } from "../../Redux/Actions/UserActionTypes";
import { RootStore } from "../../Redux/store";
import DoctorRequestScreen from "./DoctorRequestScreen";
import PatientRequestScreen from "./PatientRequestScreen";

const RequestScreen = () => {
	const {
		user: { role },
	} = useSelector((state: RootStore) => state.userReducer);

	if (role === DOCTOR_TYPE) return <DoctorRequestScreen />;
	return <PatientRequestScreen />;
};

export default RequestScreen;
