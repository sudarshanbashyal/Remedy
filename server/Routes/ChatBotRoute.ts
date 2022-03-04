import { Router } from "express";
import {
	analyzeMessageIntent,
	reportSymptomSimilarity,
} from "../Controllers/ChatBotController";

const router = Router();

router.post("/analyzeMessageIntent", analyzeMessageIntent);
router.post("/reportSymptomSimilarity", reportSymptomSimilarity);

export default router;
