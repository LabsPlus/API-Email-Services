import express from 'express';
import { EnqueueController } from '../controllers/enqueueController';

const router = express.Router();
const enqueueController = new EnqueueController();

/**
 * @swagger
 * /api/enqueue/enqueue-email:
 *   post:
 *     summary: enqueue email
 *     description: enqueue email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              from:
 *                type: string
 *              to:
 *                type: string
 *              subject:
 *                type: string
 *              text:
 *                type: string
 *              attachments:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    fileName:
 *                     type: string
 *                    fileContent:
 *                     type: string
 *              apiKey:
 *                type: string
 *     responses:
 *        200:
 *         description: Email enqueued with success
 *        400:
 *         description: Missing required parameters
 *        500:
 *         description: Internal Server Error
 */
router.post('/enqueue-email', enqueueController.enqueueEmail);

/**
 * @swagger
 * /api/enqueue/consume-email-queue:
 *   get:
 *     summary: consume email queue
 *     description: consume email queue
 *     responses:
 *        200:
 *         description: Email queue consumed with success
 *        500:
 *         description: Internal Server Error
 */
router.get('/consume-email-queue', enqueueController.consumeEmailQueue);

export default router;