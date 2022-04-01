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
	updateUserAccount,
	getDoctors,
	addMessageRequest,
	getIncomingRequests,
} from "../Controllers/UserController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.post("/registerUser", registerUser);

router.post("/loginUser", loginUser);

router.post("/checkEmail", emailExists);

router.get("/fetchUser", isAuth, fetchUser);

router.put("/updateUserProfile", isAuth, updateUserProfile);

router.put("/updateUserAccount", isAuth, updateUserAccount);

router.get("/getMessageList", isAuth, getMessageList);

router.get("/getChatMessages/:chatId", isAuth, getChatMessages);

router.get("/getChatMedia/:chatId", isAuth, getChatMedia);

router.post("/getDoctors", isAuth, getDoctors);

router.post("/addMessageRequest", isAuth, addMessageRequest);

router.post("/getIncomingRequests", isAuth, getIncomingRequests);

export default router;
