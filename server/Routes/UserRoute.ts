import { Router } from "express";
import {
	registerUser,
	loginUser,
	emailExists,
	fetchUser,
} from "../Controllers/UserController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.post("/checkEmail", emailExists);

router.get("/fetchUser", isAuth, fetchUser);

export default router;
