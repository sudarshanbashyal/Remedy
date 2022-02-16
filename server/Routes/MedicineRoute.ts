import { Router } from "express";
import {
	addMedicine,
	getMedicineDetails,
	getMedicineList,
	updateMedicine,
} from "../Controllers/MedicineController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/addMedicine", isAuth, addMedicine);

router.get("/getMedicineList", isAuth, getMedicineList);

router.get("/getMedicineDetails/:medicineId", isAuth, getMedicineDetails);

router.put("/updateMedicine/:medicineId", isAuth, updateMedicine);

export default router;
