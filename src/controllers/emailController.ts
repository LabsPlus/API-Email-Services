import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';
import { Email } from "../interfaces/email/Imail";
import EmailValidator from '../helpers/validators/email_validator';



export default class EmailController {
    private emailService: EmailService;
    private validateEmail: EmailValidator;

    constructor() {
        this.emailService = new EmailService();
        this.validateEmail = new EmailValidator();
    }

    public async sendEmail(req: Request, res: Response) {
        try {
            const { from, subject, attachments, to, text, html, apiKey } = req.body;

            if (!to || !from || !apiKey) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            if (! await this.validateEmail.isEmailValid(to)) {
                return res.status(400).json({ error: 'Invalid recipient e-mail address' });
            }

            if (! await this.validateEmail.isEmailValid(from)) {
                return res.status(400).json({ error: 'Invalid sender e-mail address' });
            }
            
            const email = {
                from,
                subject,
                attachments,
                to,
                text,
                html,
                apiKey,
            };


            const result = await this.emailService.sendEmail(email as Email);

            return res.status(200).json({ message: result });
        }

        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async responseToEmailNotSent(req: Request, res: Response) {
        try {
            const { from, subject, attachments, to, text, html, apiKey, error } = req.body;

            if (!to || !from || !apiKey) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            const email = {
                from,
                subject,
                attachments,
                to,
                text,
                html,
                apiKey,
            };


            const result = await this.emailService.responseToEmailNotSent(error, email);

            return res.status(200).json({ message: result });
        }

        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}