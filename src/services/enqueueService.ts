import RedisClient from "../clients/redis/redis_client";
import { EmailService } from "./emailService";
import { Email } from "../interfaces/email/Imail";

export default class EnqueueService {

    private redisClient = RedisClient;
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async enqueueEmail(email: Email) : Promise<string> {
        
        const emailString = JSON.stringify(email);
        try {
            await this.redisClient.rpush('fila_emails', emailString);
            return `Email enqueued with success`;
        }catch (error: any) {
            throw new Error(error.message || 'Error enqueueing task.');
        }
    }

    public async consumeEmailQueue(): Promise<string[]> {
        
        try {
            let emailsSent: string[] = [];
            while (true) {
                const email = await this.redisClient.lpop('fila_emails');
                if (email) {
                    const emailObject = JSON.parse(email);
                    const emailSent = await this.emailService.sendEmail(emailObject as Email);
                    emailsSent.push(emailSent);
                } else {
                    break;
                }
            }
            return emailsSent.length > 0 ? emailsSent : ['No emails to send'];
        } catch (error: any) {
            throw new Error(error.message || 'Error consuming email queue.');
        }
    }

    public async checkEmailQueueStatus() : Promise<string> {
        
        try {
            const emailQueueLength = await this.redisClient.llen('fila_emails');
            return `Email queue length: ${emailQueueLength}`;

        }catch (error: any) {
            throw new Error(error.message || 'Error checking email queue status.');
        }
    }

    public async clearEmailQueue() : Promise<string> {
        
        try {
            await this.redisClient.del('fila_emails');
            return `Email queue cleared with success`;

        }catch (error: any) {
            throw new Error(error.message || 'Error clearing email queue.');
        }
    }

    public async closeConnection() : Promise<string> {
            
            try {
                await this.redisClient.quit();
                return `Connection closed with success`;
    
            }catch (error: any) {
                throw new Error(error.message || 'Error closing connection.');
            }
    }

    public async emailQueueLength() : Promise<number> {
        
        try {
            const emailQueueLength = await this.redisClient.llen('fila_emails');
            return emailQueueLength;

        }catch (error: any) {
            throw new Error(error.message || 'Error checking email queue length.');
        }
    }
}
