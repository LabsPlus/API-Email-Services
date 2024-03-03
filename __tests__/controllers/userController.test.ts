import UserController from '../../src/controllers/userController';
import UserService from '../../src/services/userService';
import { Request, Response } from 'express';

jest.mock('../../src/services/userService');

describe('UserController', () => {
    let userController: UserController;
    let userServiceMock: jest.Mocked<UserService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        userServiceMock = new UserService() as jest.Mocked<UserService>; // Initialize userServiceMock as a mocked instance
        userController = new UserController();
        (userController as any).userService = userServiceMock; // Inject the mocked userServiceMock into the UserController instance
        mockRequest = { body: {} }; // Set an empty body by default
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should create a user successfully', async () => {
        // Arrange
        const mockUserData = { name: 'John Doe', company_name: 'Example Inc.', login_id: 1 };
        const mockUser = { id: 1, ...mockUserData };
        userServiceMock.createUser.mockResolvedValueOnce(mockUser);

        // Act
        mockRequest.body = mockUserData;
        await userController.createUser(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle errors when creating a user', async () => {
        // Arrange
        const mockError = new Error('Failed to create user');
        userServiceMock.createUser.mockRejectedValueOnce(mockError);

        // Act
        await userController.createUser(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to create user' });
    });
});