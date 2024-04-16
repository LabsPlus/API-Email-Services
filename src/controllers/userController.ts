import { IUser } from "../interfaces/user/userInterface";
import UserService from "../services/userService";
import { Request, Response } from "express";

export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(request: Request, response: Response) {
        try {
            const { name, email, email_recovery, password, cpf_cnpj, phone_number } = request.body;

            if (!email || !email_recovery || !password || !cpf_cnpj || !phone_number || !name) {
                return response
                    .status(400)
                    .json({ error: "Erro ao criar login, faltam dados" });
            }

            const user = await this.userService.createUser({ name, email, email_recovery, password, cpf_cnpj, phone_number } as IUser);
            return response.status(201).json(user);
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ error: `${error}` });
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

    public async forgotPassword(request: Request, response: Response) {
        try {
            const { email } = request.body;
            const user = await this.userService.getUserByEmail(email);

            if (!email) {
                return response.status(400).json({ error: 'Email não informado' });
            }

            if (!await this.userService.checkUserExists(email)) {
                return response.status(404).json({ error: 'Usuário não encontrado' });
            }

            const forgetPasswordResponse = await this.userService.forgetPassword(email);
            return response.status(200).json(forgetPasswordResponse);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to send email' });
        }
    }
}
