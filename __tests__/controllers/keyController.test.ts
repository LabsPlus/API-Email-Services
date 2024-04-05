import request from 'supertest';
import  KeyController  from '../../src/controllers/keyController';
import KeyService from '../../src/services/keyService';

describe('KeyController', () => {
    let keyController: KeyController;

    beforeEach(() => {
        keyController = new KeyController();
    });

    describe('createKey', () => {
        it('should create a key successfully', async () => {
            const mockReq = { body: { 
                key: 'key',
                description: 'description',
                userId: 1,
            } } as any;
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            const mockKey = { 
                key: 'key',
                description: 'description',
                userId: 1,
            } as any;

            jest.spyOn(KeyService.prototype, 'createKey').mockResolvedValueOnce(mockKey);

            await keyController.createKey(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockKey);
        });

        it('should handle errors when creating a key', async () => {
            const mockReq = { body: { 
                key: 'key',
                description: 'description',
                userId: 1,
             } } as any;
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            const mockError = new Error('Failed to create key');

            jest.spyOn(KeyService.prototype, 'createKey').mockRejectedValueOnce(mockError);

            await keyController.createKey(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith( { "message": "Failed to create key" });
        });
    });

});

