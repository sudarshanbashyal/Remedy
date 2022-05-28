import { Router } from "express";
import {
	getAllDoctors,
	updateDoctorVerification,
} from "../Controllers/AdminController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.get("/getAllDoctors", isAuth, getAllDoctors);

router.put(
	"/updateDoctorVerification/:userId",
	isAuth,
	updateDoctorVerification
);

export default router;
