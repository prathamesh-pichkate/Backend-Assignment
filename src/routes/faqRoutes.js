// filepath: /home/prathamesh/Desktop/Backend-Assignment/src/routes/faqRoutes.js
import express from 'express';
import { getFAQs, createFAQ } from '../controllers/faqController.js';

const router = express.Router();

router.get('/faqs', getFAQs);
router.post('/faqs', createFAQ);

export default router;