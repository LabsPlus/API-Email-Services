import { Request, Response } from 'express';
import LoginController from '../../src/controllers/loginController';
import LoginService from '../../src/services/loginService';

describe('LoginController', () => {
    let loginController: LoginController;

    beforeEach(() => {
        loginController = new LoginController();
    });

    describe('createLogin', () => {
        it('should handle errors when creating login', async () => {
            const mockReq = { body: { /* dados inválidos */ } };
            const mockRes: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            jest.spyOn(LoginService.prototype, 'createLogin').mockRejectedValueOnce(new Error('Failed to create login'));

            await loginController.createLogin(mockReq as any, mockRes as any);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getLoginById', () => {
        it('should get login by id successfully', async () => {
            // Simulate a request with a mock id
            const mockReq = { params: { id: 123 } } as any;
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            // Mock login data
            const mockLogin = { /* mock login data */ };

            // Mock the LoginService method to resolve with mock login data
            jest.spyOn(LoginService.prototype, 'getLoginById').mockResolvedValueOnce(mockLogin as any);

            // Call the method being tested
            await loginController.getLoginById(mockReq, mockRes);

            // Expect the response status and data to match
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockLogin);
        });

        it('should handle errors when getting login by id', async () => {
            // Simulate a request with a mock id
            const mockReq = { params: { id: 123 } } as any;
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as any;

            // Mock the error
            const mockError = new Error('Failed to get login by id');

            // Mock the LoginService method to reject with mock error
            jest.spyOn(LoginService.prototype, 'getLoginById').mockRejectedValueOnce(mockError);

            // Call the method being tested
            await loginController.getLoginById(mockReq, mockRes);

            // Expect the response status and data to match
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: mockError.message });
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
