import { Router } from "express";
import { getAllDoctors } from "../Controllers/AdminController";
import { isAuth } from "../Utils/Auth";

const router = Router();

router.get("/getAllDoctors", isAuth, getAllDoctors);

export default router;
