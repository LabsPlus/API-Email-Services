import express from "express";
import EmailController from "../controllers/emailController";

const router = express.Router();
const senderEmail = new EmailController();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     description: Send an email
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
 *         description: Email sent with success
 *        400:
 *         description: Missing required parameters
 *        500:
 *         description: Internal Server Error
 */
router.post("/send", async (req, res) => {
  await senderEmail.sendEmail(req, res);
});

export default router;
