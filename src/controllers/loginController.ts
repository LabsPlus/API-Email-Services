import {Request, Response} from 'express';
import LoginService from '../services/loginService';
import { errorMiddleware } from '../middlewares/error';

export default class LoginController {
    private loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    public async createLogin(request: Request, response: Response): Promise<void> {
        try {
            const { email, email_recovery, password } = request.body;
            const login = await this.loginService.createLogin({ email, email_recovery, password });
            response.status(201).json(login);
        }
        catch (errorMiddleware) {
            response.status(400).json({ errorMiddleware });
        }
    }

    public async getLoginById(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            const login = await this.loginService.getLoginById(id);
            response.status(200).json(login);
        }
        catch (errorMiddleware) {
            response.status(400).json({ errorMiddleware });
        }
    }

    public async login(request: Request, response: Response): Promise<void> {
        try {
            const { email, password } = request.body;
            const login = await this.loginService.getLoginByEmail(email);
            if (login) {
                const validPassword = await this.loginService.comparePassword(password, login.password);
                if (validPassword) {
                    const token = await this.loginService.generateToken(email);
                    response.status(200).json({ token });
                } else {
                    response.status(401).json({ message: 'Senha inválida' });
                }
            } else {
                response.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (errorMiddleware) {
            response.status(400).json({ errorMiddleware });
        }
    }

    public async getLoginByEmail(request: Request, response: Response): Promise<void> {
        try {
            const email = request.params.email;
            const login = await this.loginService.getLoginByEmail(email);
            response.status(200).json(login);
        }
        catch (errorMiddleware) {
            response.status(400).json({ errorMiddleware });
        }
    }

}