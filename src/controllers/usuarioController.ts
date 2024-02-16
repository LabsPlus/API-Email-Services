import { IUsuario } from "../interfaces/usuario/usuarioInterface";
import UsuarioService from "../services/usuarioService";
import { Request, Response } from "express";

export default class UsuarioController {

    private usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }

    public async createUsuario(request: Request, response: Response): Promise<void> {
        try {
            const { name, company_name, login_id } = request.body;
            const usuario = await this.usuarioService.createUsuario({ name, company_name, login_id } as IUsuario);
            response.status(201).json(usuario);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async getUsuarioById(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            const usuario = await this.usuarioService.getUsuarioById(id);
            response.status(200).json(usuario);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async updateUsuario(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            const usuarioData = request.body;
            const usuario = await this.usuarioService.updateUsuario(id, usuarioData);
            response.status(200).json(usuario);
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }

    public async deleteUsuario(request: Request, response: Response): Promise<void> {
        try {
            const id = parseInt(request.params.id);
            await this.usuarioService.deleteUsuario(id);
            response.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
        catch (error) {
            response.status(400).json({ error });
        }
    }
}
