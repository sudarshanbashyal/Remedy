import { Router } from "express";
import {
	registerUser,
	loginUser,
	emailExists,
	fetchUser,
	updateUserProfile,
	getMessageList,
	getChatMessages,
	getChatMedia,
} from "../Controllers/UserController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.post("/checkEmail", emailExists);

router.get("/fetchUser", isAuth, fetchUser);

router.put("/updateUserProfile", isAuth, updateUserProfile);

router.get("/getMessageList", isAuth, getMessageList);

router.get("/getChatMessages/:chatId", isAuth, getChatMessages);

router.get("/getChatMedia/:chatId", isAuth, getChatMedia);

export default router;
