import User from '../../model/user_model';
import { IUser } from '../../interfaces/user/userInterface';

export default class UserDao {
    public async createuser(userData: IUser): Promise<IUser> {
        try {
            const user = await User.create({
                name: userData.name,
                cpf_cnpj: userData.cpf_cnpj,
                phone_number: userData.phone_number,
                email: userData.email,
                email_recovery: userData.email_recovery,
                password: userData.password,
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

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try{
            const login = await User.findOne({where: {email}});
            return login;
        }catch(error) {
            throw new Error(`Erro ao buscar login: ${error}`);
        }
    }
}
