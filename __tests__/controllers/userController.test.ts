import UserController from '../../src/controllers/userController';
import { IUser } from '../../src/interfaces/user/userInterface';
import UserService from '../../src/services/userService';
import { Request, Response } from 'express';

jest.mock('../../src/services/userService');

describe('UserController', () => {
    let userController: UserController;
    let userServiceMock: jest.Mocked<UserService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(() => {
        userServiceMock = new UserService() as jest.Mocked<UserService>; // Initialize userServiceMock as a mocked instance
        userController = new UserController();
        (userController as any).userService = userServiceMock; // Inject the mocked userServiceMock into the UserController instance
        mockRequest = { body: {} }; // Set an empty body by default
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        request = {
            headers: {
                authorization: 'Bearer token123'
            },
            body: {
                name: 'Test User',
                email: 'test@example.com'
            }
        };
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should create a user successfully', async () => {
        // Arrange
        const mockUserData: IUser = {
            name: 'John Doe',
            cpf_cnpj: '123456789',
            phone_number: '123456789',
            email: 'anc@gmail.com',
            email_recovery: 'anc@gmail.com',
            password: '123456',
            id: 0,
            reset_password_token: '',
            reset_password_expires: new Date() // Change the type to Date
        };

        userServiceMock.createUser.mockResolvedValueOnce(mockUserData);

        // Act
        mockRequest.body = mockUserData;
        await userController.createUser(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUserData);
    });

    it('should handle errors when creating a user', async () => {
        // Arrange
        const mockError = new Error('Failed to create user');
        userServiceMock.createUser.mockRejectedValueOnce(mockError);

        // Act
        await userController.createUser(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith( {"error": "Erro ao criar login, faltam dados"});
    });

    it('deve retornar erro se o token não for informado', async () => {
        // Remova o token do request
        if (request.headers) {
            request.headers.authorization = undefined;
        }
        
        // Chame o método que você quer testar
        await userController.updateUser(request as Request, response as Response);
        
        // Agora você pode esperar que response.status seja chamado com 400
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: 'Token não informado' });
    });
});