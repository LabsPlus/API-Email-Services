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
            throw (`${error}`);
        }
    }

    public async getuserById(id: number): Promise<IUser | null> {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw new Error(`${error}`);
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
            throw new Error(`${error}`);
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
            throw new Error(`${error}`);
        }
    }

    public async scheduleUserDeletion(id: number, date: Date): Promise<string> {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                return 'Usuário não encontrado';
            }

            const todayDate = new Date();

            await user.update({deletion_scheduled_at: date, deletion_requested_at: todayDate});

            return 'Deleção de perfil agendada com sucesso';
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    
    public async deleteUserByDeletionScheduledAt(date: Date): Promise<string> {
        try {
            
            const users = await User.findAll({where: {deletion_scheduled_at: date}});
            
            if (!users) {
                return 'Nenhum usuário encontrado';
            }

            users.forEach(async user => {
                await user.destroy();
            });

            return 'Usuários deletados com sucesso';
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async reactivateUser(id: number): Promise<string> {

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return 'Usuário não encontrado';
            }

            await user.update({deletion_scheduled_at: null, deletion_requested_at: null});

            return 'Perfil reativado com sucesso';
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }

    
    public async getUserByEmail(email: string): Promise<IUser | null> {
        try{
            const login = await User.findOne({where: {email}});
            return login;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async getUserByCpfOrCnpj(cpf_cnpj: string): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {cpf_cnpj}});
            return user;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async getUserByEmailRecovery(email_recovery: string): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {email_recovery}});
            return user;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async getUserByPhoneNumber(phone_number: string): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {phone_number}});
            return user;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async getUserByResetPasswordToken(reset_password_token: string): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {reset_password_token}});
            return user;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async updateUserByEmail(email: string, userData: Partial<IUser>): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {email}});
            if (!user) {
                return null;
            }
            await user.update(userData);
            return user;
        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async updateUserPassword(email: string, password: string): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {email}});
            if (!user) {
                return null;
            }
            await user.update({password, reset_password_token: null, reset_password_expires: null});
            return user;

        }catch(error) {
            throw new Error(`${error}`);
        }
    }

    public async updateUserResetPasswordToken(email_recovery: string, reset_password_token: string, reset_password_expires: Date): Promise<IUser | null> {
        try{
            const user = await User.findOne({where: {email_recovery}});
            if (!user) {
                return null;
            }

            await user.update({reset_password_token, reset_password_expires});
            return user;

        }catch(error) {
            throw new Error(`${error}`);
        }

    }

}
