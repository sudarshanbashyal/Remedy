import { Router } from "express";
import {
	analyzeMessageIntent,
	getSimilarSymptoms,
	reportSymptomSimilarity,
} from "../Controllers/ChatBotController";

const router = Router();

router.post("/analyzeMessageIntent", analyzeMessageIntent);
router.post("/reportSymptomSimilarity", reportSymptomSimilarity);
router.post("/getSimilarSymptoms", getSimilarSymptoms);

export default router;
