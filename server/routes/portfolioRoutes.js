import { Router } from 'express';
import { generatePortfolio } from '../controllers/portfolioController.js';
import { validateProfilePayload } from '../middleware/validator.js';

const router = Router();

// POST /api/portfolio/generate
router.post('/generate', validateProfilePayload, generatePortfolio);

export default router;
