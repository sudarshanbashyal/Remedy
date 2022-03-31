import { Router } from "express";
import {
	analyzeMessageIntent,
	getDiagnosis,
	getSimilarSymptoms,
	reportSymptomSimilarity,
} from "../Controllers/ChatBotController";

const router = Router();

router.post("/analyzeMessageIntent", analyzeMessageIntent);

router.post("/reportSymptomSimilarity", reportSymptomSimilarity);

router.post("/getSimilarSymptoms", getSimilarSymptoms);

router.post("/getDiagnosis", getDiagnosis);

export default router;
