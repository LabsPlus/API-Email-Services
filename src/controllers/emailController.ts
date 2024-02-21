import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';


export default class EmailController {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async sendEmail(req: Request, res: Response) {
        try {
            const { destination, content, subject, attachment} = req.body;

            if (!destination || !content || !subject) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            const result = this.emailService.sendEmail({
                destination,
                content,
                subject,
                attachment,
            });

            return res.status(200).json({ message: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}