import  EnqueueService  from "../services/enqueueService";
import { Request, Response } from 'express';
import EmailValidator from "../helpers/validators/email_validator";
import ApiKeyValidator from "../helpers/validators/apikey_validator";

export class EnqueueController {

    private enqueueService: EnqueueService;

    constructor() {
        this.enqueueService = new EnqueueService();
    }

    public async enqueueEmail(req: Request, res: Response) {
        
        try {

            const validateEmail = new EmailValidator();
            const validateApiKey = new ApiKeyValidator();

            const { from, subject, attachments, to, text, html, apiKey } = req.body;

            if (!to || !from || !apiKey) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            if (! await validateEmail.isEmailValid(to)) {
                return res.status(400).json({ error: 'Invalid recipient e-mail address' });
            }

            if (! await validateEmail.isEmailValid(from)) {
                return res.status(400).json({ error: 'Invalid sender e-mail address' });
            }
            if(! await validateApiKey.isApiKeyValid(apiKey)){
                return res.status(400).json({ error:'ApiKey is not valid'});
            }
            
            const enqueueService = new EnqueueService();
            const email = {
                from,
                subject,
                attachments,
                to,
                text,
                html,
                apiKey,
            };

            const result = await enqueueService.enqueueEmail(email);

            return res.status(200).json({ message: result}) ;
        } catch (error: any) {
            return res.status(500).json({ error: error.message});
        }
    }

    public async consumeEmailQueue(req: Request, res: Response) {
        
        try {

            const result = await this.enqueueService.consumeEmailQueue();
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.message});
        }
    }

    public async closeRedisConnection() {

        const result = await this.enqueueService.closeConnection();
    }
}