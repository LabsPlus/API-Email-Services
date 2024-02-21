import express from 'express';
import EmailController from '../controllers/emailController';

const router = express.Router();
const senderEmail = new EmailController();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: Destination email address
 *               subject:
 *                 type: string
 *                 description: Email subject
 *               content:
 *                 type: string
 *                 description: Email content
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     fileName:
 *                       type: string
 *                       description: File name
 *                     fileContent:
 *                       type: string
 *                       description: File content in base64
 *     responses:
 *       200:
 *           description: Email sent successfully
 *       400:
 *           description: Invalid parameters
 *       500:
 *           description: Error sending email
 *     description: Send an email passing the parameters in the request body, destinations, subject, content, attachments
 */
router.post('/send', async (req, res) => {
    await senderEmail.sendEmail(req, res);
});

export default router;
