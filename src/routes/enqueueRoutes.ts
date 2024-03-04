import express from 'express';
import { EnqueueController } from '../controllers/enqueueController';

const router = express.Router();
const enqueueController = new EnqueueController();

router.post('/enqueue-email', enqueueController.enqueueEmail);
router.get('/consume-email-queue', enqueueController.consumeEmailQueue);

export default router;