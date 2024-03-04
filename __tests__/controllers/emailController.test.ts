import  EmailController  from '../../src/controllers/emailController';
import { EmailService } from '../../src/services/emailService';
import { Email } from "../../src/interfaces/email/Imail";

jest.mock('../../src/services/emailService');

describe('EmailController', () => {
    let emailController: EmailController;

    beforeEach(() => {
        emailController = new EmailController();
    });

    it('should send an email successfully', async () => {
        const mockReq = {
            body: {
                from: 'sender@example.com',
                subject: 'Test email',
                to: 'recipient@example.com',
                apiKey: 'valid_api_key',
            }
        } as any;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        (EmailService.prototype.sendEmail as jest.Mock).mockResolvedValue('Email sent with success');

        await emailController.sendEmail(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Email sent with success' });
    });

    it('should handle response to email not sent', async () => {
        const mockReq = {
            body: {
                from: 'sender@example.com',
                subject: 'Test email',
                to: 'recipient@example.com',
                apiKey: 'invalid_api_key',
                error: 'Invalid API Key',
            }
        } as any;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        (EmailService.prototype.responseToEmailNotSent as jest.Mock).mockResolvedValue('Invalid API Key');

        await emailController.responseToEmailNotSent(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid API Key' });
    });

    it('should return 400 if recipient email is invalid', async () => {
        const mockReq = {
            body: {
                from: 'sender@example.com',
                subject: 'Test email',
                to: 'invalid_email',
                apiKey: 'valid_api_key',
            }
        } as any;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await emailController.sendEmail(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid recipient e-mail address' });
    });

    it('should return 400 if sender email is invalid', async () => {
        const mockReq = {
            body: {
                from: 'invalid_email',
                subject: 'Test email',
                to: 'recipient@example.com',
                apiKey: 'valid_api_key',
            }
        } as any;
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        await emailController.sendEmail(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid sender e-mail address' });
    });
});