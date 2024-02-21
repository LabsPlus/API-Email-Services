import express from 'express';
import EmailController from '../controllers/emailController';

const router = express.Router();
const senderEmail = new EmailController();

/**
 * @swagger
 * /email/send:
 *  post:
 *   tags: [Email]
 *  summary: Send an email
 * description: Send an email
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Email'
 * responses:
 * 200:
 * description: Email sent with success
 * 400:
 * description: Missing required parameters
 * 500:
 * description: Internal Server Error
 */
router.post('/send', async (req, res) => {
    await senderEmail.sendEmail(req, res);
});

export default router;
