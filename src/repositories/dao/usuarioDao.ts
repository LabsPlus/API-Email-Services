import Usuario from '../../model/usuario_model';
import { IUsuario } from '../../interfaces/usuario/usuarioInterface';

export default class UsuarioDao {
    public async createUsuario(usuarioData: IUsuario): Promise<IUsuario> {
        try {
            const usuario = await Usuario.create({
                name: usuarioData.name,
                company_name: usuarioData.company_name,
                login_id: usuarioData.login_id,
            });

            return usuario;
            
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error}`);
        }
    }

    public async getUsuarioById(id: number): Promise<IUsuario | null> {
        try {
            const usuario = await Usuario.findByPk(id);
            return usuario;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    public async updateUsuario(id: number, usuarioData: Partial<IUsuario>): Promise<IUsuario | null> {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return null;
            }
            await usuario.update(usuarioData);
            return usuario;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    public async deleteUsuario(id: number): Promise<void> {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            await usuario.destroy();
        } catch (error) {
            throw new Error(`Erro ao excluir usuário: ${error}`);
        }
    }
}
