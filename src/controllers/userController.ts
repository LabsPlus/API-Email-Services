import { IUser } from "../interfaces/user/userInterface";
import UserService from "../services/userService";
import { Request, Response } from "express";
import EmailValidator from "../helpers/validators/email_validator";

export default class UserController {

    private userService: UserService;
    private emailValidator: EmailValidator;

    constructor() {
        this.userService = new UserService();
        this.emailValidator = new EmailValidator();
    }

    public async createUser(request: Request, response: Response) {
        try {
            const { name, email, email_recovery, password, cpf_cnpj, phone_number } = request.body;

            if (!email || !email_recovery || !password) {
                return response
                    .status(400)
                    .json({ error: "Erro ao criar login, faltam dados" });
            }
            if (
                !(await this.emailValidator.isEmailValid(email)) ||
                !(await this.emailValidator.isEmailValid(email_recovery))
            ) {
                return response
                    .status(400)
                    .json({ error: "Erro ao criar login, formato de email inválido" });
            }

            const user = await this.userService.createUser({ name, email, email_recovery, password, cpf_cnpj, phone_number } as IUser);
            return response.status(201).json(user);
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ error: '1Failed to create user' });
        }
    }

    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                const validPassword = await this.userService.comparePassword(password, user.password);
                if (validPassword) {
                    const token = await this.userService.generateToken(email);
                    return response.status(200).json({ token });
                } else {
                    return response.status(401).json({ message: "Senha inválida" });
                }
            } else {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async getUserById(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            const user = await this.userService.getUserById(id);
            return response.status(200).json(user);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to get user by id' });
        }
    }

    public async updateUser(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            const userData = request.body;
            const user = await this.userService.updateUser(id, userData);
            return response.status(200).json(user);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to update user' });
        }
    }

    public async deleteUser(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            await this.userService.deleteUser(id);
            return response.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to delete user' });
        }
    }
}
