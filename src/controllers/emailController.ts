import { Request, Response } from 'express';
import { EmailService } from '../services/emailService'; // Update the path based on your project structure

 const emailController = new EmailService(); 

    export async function sendEmail(req: Request, res: Response) {
        try {
            // Assuming you're sending email details in the request body, adjust accordingly
            const { destination, content, subject, attachment} = req.body;

            if (!destination || !content || !subject) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            const result = emailController.sendEmail({
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
