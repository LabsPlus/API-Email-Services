require('dotenv').config();
import * as nodemailer from 'nodemailer';
import { Email } from "../interfaces/email/Imail";
import KeyService from '../services/keyService';

class EmailService {

  private keyService: KeyService;

  constructor() {
    this.keyService = new KeyService();
  }

  public async sendEmail({ from, subject, attachments, to, text, html, apiKey }: Email) : Promise<string> {
    try {

      if (! await this.checkApiKey(apiKey)) {
        throw new Error('Invalid API Key');
      }
      else {
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
          from: from,
          to: to,
          subject: subject,
          text: text,
          content: attachments,
        };

        const information = await transporter.sendMail(mailBody);
        transporter.close();

        return `E-mail sent with success ${information.response}`;
      }
      }
    catch (error) {
        throw new Error('Email not sended');
      }
    }

  public async checkEmailServiceStatus(): Promise<string> {
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

  public async checkApiKey(apiKey: string): Promise<boolean> {
    return await this.keyService.keyExists(apiKey);
  }

}

export { EmailService };