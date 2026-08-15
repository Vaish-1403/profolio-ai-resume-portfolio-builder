import { Router } from 'express';
import { generateResume, analyzeResume } from '../controllers/resumeController.js';
import { validateProfilePayload } from '../middleware/validator.js';

const router = Router();

// POST /api/resume/generate
router.post('/generate', validateProfilePayload, generateResume);

// POST /api/resume/analyze
router.post('/analyze', validateProfilePayload, analyzeResume);

export default router;
