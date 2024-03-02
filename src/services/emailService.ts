require('dotenv').config();
import * as nodemailer from 'nodemailer';
import { Email } from "../interfaces/email/Imail";
import KeyService from '../services/keyService';

class EmailService {

  private keyService: KeyService;

  constructor() {
    this.keyService = new KeyService();
  }

  public async sendEmail({ from, subject, attachments, html, to, text, apiKey }: Email): Promise<string> {
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
          html: html,
          content: attachments,
        };

        const information = await transporter.sendMail(mailBody);
        transporter.close();

        return `E-mail sent with success ${information.response}`;
      }
    }
    catch (error: any) {
      
      await this.responseToEmailNotSent(error.message, { from, subject, attachments, html, to, text, apiKey });

      throw new Error(error.message || 'Error sending email.');
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

  public async responseToEmailNotSent(error: string, email: Email): Promise<string> {

    try {
      const emailBody = `
                          <p>Caro usuário,</p>
                          <p>Lamentamos informar que o seu e-mail não pôde ser entregue, devido ao seguinte erro: <strong>${error}</strong>.</p>
                          <p>Por favor, tente novamente mais tarde ou entre em contato com nossa equipe de suporte se precisar de assistência imediata.</p>
                          <p>Obrigado pela sua compreensão,</p>
                          <p>A equipe de suporte</p>
                        `

      const emailResponse: Email = {
        from: process.env.SMTP_EMAIL_SENDER as string,
        to: email.from,
        subject: `Erro ao enviar o e-mail para o endereço ${email.to}`,
        text: email.text,
        html: emailBody,
        attachments: email.attachments,
        apiKey: process.env.API_EMAIL_KEY as string,
      }

      const response = await this.sendEmail(emailResponse);

      return response;
    }
    catch (error: any) {
      throw new Error(error.message);
    }

  }

}

export { EmailService };