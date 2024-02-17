import User from '../../model/user_model';
import { IUser } from '../../interfaces/user/userInterface';

export default class UserDao {
    public async createuser(userData: IUser): Promise<IUser> {
        try {
            const user = await User.create({
                name: userData.name,
                company_name: userData.company_name,
                login_id: userData.login_id,
            });

            return user;
            
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error}`);
        }
    }

    public async getuserById(id: number): Promise<IUser | null> {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por ID: ${error}`);
        }
    }

    public async updateuser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return null;
            }
            await user.update(userData);
            return user;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }

    public async deleteuser(id: number): Promise<void> {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            await user.destroy();
        } catch (error) {
            throw new Error(`Erro ao excluir usuário: ${error}`);
        }
    }

    public static async checkDatabaseConnection(): Promise<string> {
        try {
            await User.findAll();
            return 'Serviço de usuário está funcionando!';
        } catch (error) {
            throw new Error(`Erro ao verificar serviço de usuário: ${error}`);
        }
    }
}
