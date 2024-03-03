import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LoginDao from '../../src/repositories/dao/loginDao';
import LoginService from '../../src/services/loginService';
import { ILogin } from '../../src/interfaces/login/loginInterface';

jest.mock('../../src/repositories/dao/loginDao');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('LoginService', () => {
    let loginService: LoginService;

    beforeEach(() => {
        loginService = new LoginService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a login', async () => {
        const loginData: ILogin = {
            email: 'test@example.com',
            email_recovery: 'test@example.com',
            password: 'password',
        };
        const hashedPassword = 'hashedPassword';
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        const createdLogin: ILogin = { ...loginData, password: hashedPassword };
        (LoginDao.prototype.createLogin as jest.Mock).mockResolvedValue(createdLogin);

        const result = await loginService.createLogin(loginData);

        expect(result).toEqual(createdLogin);
    });

    it('should generate a token', async () => {
        const email = 'test@example.com';
        const token = 'generatedToken';
        (jwt.sign as jest.Mock).mockReturnValue(token);

        const result = await loginService.generateToken(email);

        expect(result).toBe(token);
    });

    // Similar tests for getLoginById, getLoginByEmail, and comparePassword methods
});
