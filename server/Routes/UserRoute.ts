import { Router } from "express";
import {
	registerUser,
	loginUser,
	emailExists,
	fetchUser,
	updateUserProfile,
} from "../Controllers/UserController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.post("/checkEmail", emailExists);

router.get("/fetchUser", isAuth, fetchUser);

router.put("/updateUserProfile", isAuth, updateUserProfile);

export default router;
