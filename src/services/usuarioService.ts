import { IUsuario } from "../interfaces/usuario/usuarioInterface";
import UsuarioDao from "../repositories/dao/usuarioDao";

export default class UsuarioService {

    private usuarioDao: UsuarioDao;

    constructor() {
        this.usuarioDao = new UsuarioDao();
    }

    public async createUsuario({name, company_name, login_id}: IUsuario): Promise<IUsuario> {
        try
        {
            const usuarioData = { 
                name,
                company_name,
                login_id,
            } as IUsuario;

            const usuario = await this.usuarioDao.createUsuario(usuarioData);
            return usuario;

        }catch(error) {
            throw new Error(`Erro ao criar usuario: ${error}`);
        }
    }

    public async getUsuarioById(id: number): Promise<IUsuario | null> {
        try{
            const usuario = await this.usuarioDao.getUsuarioById(id);
            return usuario;
        }catch(error) {
            throw new Error(`Erro ao buscar usuario: ${error}`);
        }
    }

    public async updateUsuario(id: number, usuarioData: Partial<IUsuario>): Promise<IUsuario | null> {
        try{
            const usuario = await this.usuarioDao.updateUsuario(id, usuarioData);
            return usuario;
        }catch(error) {
            throw new Error(`Erro ao atualizar usuario: ${error}`);
        }
    }

    public async deleteUsuario(id: number): Promise<void> {
        try{
            await this.usuarioDao.deleteUsuario(id);
        }catch(error) {
            throw new Error(`Erro ao excluir usuario: ${error}`);
        }
    }
}