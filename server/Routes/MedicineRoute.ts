import { Router } from "express";
import {
	addMedicine,
	getFrequencies,
	getIntake,
	getMedicineDetails,
	getMedicineList,
	updateMedicine,
	updateIntakeStatus,
} from "../Controllers/MedicineController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/addMedicine", isAuth, addMedicine);

router.get("/getMedicineList", isAuth, getMedicineList);

router.get("/getMedicineDetails/:medicineId", isAuth, getMedicineDetails);

router.put("/updateMedicine/:medicineId", isAuth, updateMedicine);

router.get("/getFrequencies", isAuth, getFrequencies);

router.get("/getMedicineList", isAuth, getMedicineList);

router.post("/getIntake", isAuth, getIntake);

router.put("/updateIntakeStatus/:intakeId", isAuth, updateIntakeStatus);

export default router;
