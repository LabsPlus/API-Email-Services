import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';
import { Email } from "../interfaces/email/Imail";



export default class EmailController {
    private emailService: EmailService;


    constructor() {
        this.emailService = new EmailService();

    }

    public async sendEmail(req: Request, res: Response) {
        try {
            const { from, subject, attachments, to, text, apiKey } = req.body;

            if (!to || !from || !text || !subject || !apiKey) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            const email = {
                from,
                subject,
                attachments,
                to,
                text,
                apiKey,
            };


            const result = await this.emailService.sendEmail(email as Email);

            return res.status(200).json({ message: result });
        }

        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}