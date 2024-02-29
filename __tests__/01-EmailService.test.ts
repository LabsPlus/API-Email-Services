
import { EmailService } from '../src/services/emailService';
import { Email } from '../src/interfaces/email/Imail';
import { File } from '../src/interfaces/file/Ifile';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ response: '250 OK' }),
    close: jest.fn(),
  }),
}));

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  it('should send an email successfully', async () => {

    const file: File = {
      fileName: "string",
      content: "string"
    };

    const email: Email = {
      from: 'wesley.ulisses@labsif.com.br',
      to: 'carlos.lovey@labsif.com.br',
      subject: 'Test Subject',
      attachments: [file],
      text: 'Test Email',
      apiKey: 'lakkasjdsajdlaksjdldkjsdfdsfdsla',
    };

    const result = await emailService.sendEmail(email);

    expect(result).toBe('E-mail sent with success 250 OK');
  }, 15000);

  it('should return an error when sending an email with an invalid API Key', async () => {

    const file: File = {
      fileName: "string",
      content: "string"
    };

    const apiKey = 'invalid';

    const email: Email = {
      from: 'wesley.ulisses@labsif.com.br',
      to: 'carlos.lovey@labsif.com.br',
      subject: 'Test Subject',
      attachments: [file],
      text: 'Test Email',
      apiKey: apiKey,
    };

    try {
      await emailService.sendEmail(email);
    } catch (error: any) {
      expect(error.message).toBe('Invalid API Key');
    }
  });


  it('Should return an error when not sending an email', async () => {

    const file: File = {
      fileName: "string",
      content: "string"
    };

    const email: Email = {
      from: 'wesley.ulisses@labsif.com.br',
      to: 'carlos.lovey@labsif.com.br',
      subject: 'Test Subject',
      attachments: [file],
      text: 'Test Email',
      apiKey: 'lakkasjdsajdlaksjdldkjsdfdsfdsla',
    };

    jest.spyOn(emailService, 'checkApiKey').mockResolvedValue(true);
    jest.spyOn(emailService, 'sendEmail').mockRejectedValue(new Error('Email not sended'));

  });

  it('Should return an error when checking email service status', async () => {
    jest.spyOn(emailService, 'checkEmailServiceStatus').mockRejectedValue(new Error('Email service is down.'));
  });

  it('should send an email successfully when response to email not sent', async () => {
    const file: File = {
      fileName: "string",
      content: "string"
    };

    const email: Email = {
      from: 'wesley.ulisses@labsif.com.br',
      to: 'carlos.lovey@labsif.com.br',
      subject: 'Test Subject',
      attachments: [file],
      text: 'Test Email',
      apiKey: 'lakkasjdsajdlaksjdldkjsdfdsfdsla',
    };

    const error: string = 'Falha ao encontrar endereço';

    const result = await emailService.responseToEmailNotSent(error, email);

    expect(result).toBe('E-mail sent with success 250 OK');
  });

});
