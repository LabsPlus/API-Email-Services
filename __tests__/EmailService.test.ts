import { EmailService } from '../src/services/emailService';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
  it('deve enviar e-mail com sucesso', async () => {
    const emailService = new EmailService();
    
    const mockTransporter: any = nodemailer.createTransport;

    const mockSendMail = jest.fn();

    mockTransporter.mockReturnValue({
        sendMail: mockSendMail,
        close: jest.fn(),
      }as unknown as nodemailer.Transporter);
      

   
    const expectedResponse = 'E-mail sent with success mockResponse';
    mockSendMail.mockResolvedValue({ response: 'mockResponse' });

    const emailData = {
        destination: 'example@email.com',
        content: 'Email content',
        subject: 'Email subject',
        attachment: {
            fileName: 'filename.txt',
            fileContent: Buffer.from('file content'),
        },
    };

    const result = await emailService.sendEmail(emailData);

    expect(result).toBe(expectedResponse);
    expect(mockSendMail).toHaveBeenCalledWith({
        from: process.env.SMTP_EMAIL_SENDER,
        to: emailData.destination,
        subject: emailData.subject,
        text: emailData.content,
        content: emailData.attachment,
    });
  });

  it('deve lançar um erro ao falhar o envio de e-mail', async () => {
    const emailService = new EmailService();

    const mockTransporter = nodemailer.createTransport as jest.MockedFunction<typeof nodemailer.createTransport>;
    const mockSendMail = jest.fn();

    mockTransporter.mockReturnValue({
        sendMail: mockSendMail,
        close: jest.fn(),
      }as unknown as nodemailer.Transporter);

      const emailData = {
        destination: 'example@email.com',
        content: 'Email content',
        subject: 'Email subject',
        attachment: {
            fileName: 'filename.txt',
            fileContent: Buffer.from('file content'),
        },
    };

    const expectedError = new Error('Email not sended');
    mockSendMail.mockRejectedValue(expectedError);

    await expect(emailService.sendEmail(emailData)).rejects.toThrow(expectedError);
  });
});
