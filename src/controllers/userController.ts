import { IUser } from "../interfaces/user/userInterface";
import UserService from "../services/userService";
import { Request, Response } from "express";

export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(request: Request, response: Response): Promise<void> {
        try {
            const { name, company_name, login_id } = request.body;
            const user = await this.userService.createUser({ name, company_name, login_id } as IUser);
            response.status(201).json(user);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async getUserById(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            const user = await this.userService.getUserById(id);
            response.status(200).json(user);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async updateUser(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            const userData = request.body;
            const user = await this.userService.updateUser(id, userData);
            response.status(200).json(user);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async deleteUser(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            await this.userService.deleteUser(id);
            response.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }
}
