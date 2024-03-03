import {Request, Response} from 'express';
import LoginService from '../services/loginService';
export default class LoginController {
    private loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    public async createLogin(request: Request, response: Response) {
        try {
            const { email, email_recovery, password } = request.body;
            const login = await this.loginService.createLogin({ email, email_recovery, password });
            return response.status(201).json(login);
        }
        catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getLoginById(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            const login = await this.loginService.getLoginById(id);
            return response.status(200).json(login);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to get login by id' });
        }
    }

    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const login = await this.loginService.getLoginByEmail(email);
            if (login) {
                const validPassword = await this.loginService.comparePassword(password, login.password);
                if (validPassword) {
                    const token = await this.loginService.generateToken(email);
                    return response.status(200).json({ token });
                } else {
                    return response.status(401).json({ message: 'Senha inválida' });
                }
            } else {
                return response.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getLoginByEmail(request: Request, response: Response) {
        try {
            const email = request.params.email;
            const login = await this.loginService.getLoginByEmail(email);
            return response.status(200).json(login);
        }
        catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}