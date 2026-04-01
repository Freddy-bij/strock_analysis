import { Router } from 'express';
import PredictionController from '../controllers/predictionController';

const router = Router();
const predictionController = new PredictionController();

/**
 * @swagger
 * /api/predictions/train:
 *   post:
 *     summary: Train the stroke prediction model
 *     tags: [AI Predictions]
 *     responses:
 *       200:
 *         description: Model trained successfully
 *       500:
 *         description: Training failed
 */
router.post('/train', predictionController.trainModel);

/**
 * @swagger
 * /api/predictions/status:
 *   get:
 *     summary: Get model training status
 *     tags: [AI Predictions]
 *     responses:
 *       200:
 *         description: Model status retrieved
 */
router.get('/status', predictionController.getModelStatus);

/**
 * @swagger
 * /api/predictions/predict:
 *   post:
 *     summary: Predict stroke risk
 *     tags: [AI Predictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - age
 *               - gender
 *               - hypertension
 *               - heart_disease
 *               - ever_married
 *               - work_type
 *               - residence_type
 *               - avg_glucose_level
 *               - bmi
 *               - smoking_status
 *             properties:
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               hypertension:
 *                 type: boolean
 *               heart_disease:
 *                 type: boolean
 *               ever_married:
 *                 type: boolean
 *               work_type:
 *                 type: string
 *                 enum: [Private, Self-employed, Govt_job, children, Never_worked]
 *               residence_type:
 *                 type: string
 *                 enum: [Urban, Rural]
 *               avg_glucose_level:
 *                 type: number
 *               bmi:
 *                 type: number
 *               smoking_status:
 *                 type: string
 *                 enum: [never, formerly, current, unknown]
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prediction successful
 *       400:
 *         description: Invalid input or model not trained
 *       500:
 *         description: Prediction failed
 */
router.post('/predict', predictionController.predict);

/**
 * @swagger
 * /api/predictions/history/{userId}:
 *   get:
 *     summary: Get prediction history for a user
 *     tags: [AI Predictions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: History retrieved
 *       400:
 *         description: User ID required
 *       500:
 *         description: Failed to fetch history
 */
router.get('/history/:userId', predictionController.getPredictionHistory);

export default router;
