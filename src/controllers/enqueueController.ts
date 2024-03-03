import  EnqueueService  from "../services/enqueueService";
import { Request, Response } from 'express';

export class EnqueueController {

    private enqueueService: EnqueueService;

    constructor() {
        this.enqueueService = new EnqueueService();
    }

    public async enqueueEmail(req: Request, res: Response): Promise<void> {
        
        try {

            const enqueueService = new EnqueueService();
            const email = req.body;
            const result = await enqueueService.enqueueEmail(email);

            res.status(200).json({ message: result});
        } catch (error: any) {
            res.status(500).json({ error: error.message});
        }
    }

    public async consumeEmailQueue(req: Request, res: Response): Promise<void> {
        
        try {

            const result = await this.enqueueService.consumeEmailQueue();
            res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message});
        }
    }
}