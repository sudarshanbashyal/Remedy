import { Router } from "express";
import { analyzeMessageIntent } from "../Controllers/ChatBotController";

const router = Router();

router.post("/analyzeMessageIntent", analyzeMessageIntent);

export default router;
