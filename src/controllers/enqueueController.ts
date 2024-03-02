import  EnqueueService  from "../services/enqueueService";
import { Request, Response } from 'express';

export class EnqueueController {

    private enqueueService: EnqueueService;

    constructor() {
        this.enqueueService = new EnqueueService();
    }

    public async enqueueEmail(req: Request, res: Response): Promise<string | any> {
        
        try {
            
            const email = req.body;
            const result = await this.enqueueService.enqueueEmail(email);

            return res.status(200).json({ message: result });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ error: error.message});
        }
    }

    public async consumeEmailQueue(req: Request, res: Response): Promise<string | any> {
        
        try {
            const result = await this.enqueueService.consumeEmailQueue();
            return res.status(200).json({ message: result });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ error: error.message});
        }
    }
}