require('dotenv').config();
import * as nodemailer from 'nodemailer';
import { Email } from "../interfaces/emailInterface";

class EmailService {
    constructor() {}

    async sendEmail ({destination, content, subject, attachment}: Email) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMPT_PORT!),
                secure: false,
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
            
            const mailBody: nodemailer.SentMessageInfo = {
                from: process.env.SMTP_EMAIL_SENDER,
                to: destination,
                subject: subject,
                text: content,
                content: attachment,
            };
            
            const information = await transporter.sendMail(mailBody);
            transporter.close();
            return `E-mail sent with success ${information.response}`;
        }
        catch (error) {
            throw new Error('Email not sended');
        }
    }

    async checkEmailServiceStatus(): Promise<string> {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMPT_PORT!),
            secure: false,
            auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD,
            },
          });
    
          await transporter.verify();
    
          transporter.close();
          return 'Email service is working properly.';
        } catch (error) {
          console.error('Error checking email service status:', error);
          throw new Error('Email service is down.');
        }
      }
    
}

export { EmailService };