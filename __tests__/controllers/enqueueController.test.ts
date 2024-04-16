import request from 'supertest';
import { EnqueueController } from '../../src/controllers/enqueueController';
import EnqueueService from '../../src/services/enqueueService';

describe('EnqueueController', () => {
    let enqueueController: EnqueueController;
  
    beforeEach(() => {
      enqueueController = new EnqueueController();
    });
  
    describe('consumeEmailQueue', () => {
      it('should consume email queue successfully', async () => {
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockResult = [
          {
            from: 'sender@example.com',
            to: 'recipient@example.com',
            subject: 'Test Subject',
            text: 'Test Email Body',
          },
        ];
  
        jest.spyOn(EnqueueService.prototype, 'consumeEmailQueue').mockResolvedValueOnce(mockResult as any);
  
        await enqueueController.consumeEmailQueue({} as any, mockRes as any);
  
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockResult);
      });
  
      it('should handle errors when consuming email queue', async () => {
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Failed to consume email queue');
  
        jest.spyOn(EnqueueService.prototype, 'consumeEmailQueue').mockRejectedValueOnce(mockError);
  
        await enqueueController.consumeEmailQueue({} as any, mockRes as any);
  
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
      });
    });

    afterAll(() => {
        // Fechar a conexão Redis
        enqueueController.closeRedisConnection();
      });
      
  });