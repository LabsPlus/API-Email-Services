
import { EmailService } from '../src/services/emailService';

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
    const emailProps = {
      from: 'wesley.ulisses@labsif.com.br',
      to: 'carlos.lovey@labsif.com.br',
      subject: 'Test Subject',
      attachments: [{
        fileName: "string",
        fileContent: "string"
    }],
      text: 'Test Email',
      apiKey: 'lakkasjdsajdlaksjdldkjsdfdsfdsla',
    };

    const result = await emailService.sendEmail(emailProps);

    expect(result).toBe('E-mail sent with success 250 OK');
  },15000);
});
