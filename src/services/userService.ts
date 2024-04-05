import { IUser } from "../interfaces/user/userInterface";
import UserDao from "../repositories/dao/userDao";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserService {

    private userDao: UserDao;
  static checkUserServiceStatus: any;

    constructor() {
        this.userDao = new UserDao();
    }

    public async createUser(user : IUser): Promise<IUser> {
        try
        {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            const userData = {
                name: user.name,
                cpf_cnpj: user.cpf_cnpj,
                phone_number: user.phone_number,
                email: user.email,
                email_recovery: user.email_recovery,
                password: hashedPassword,
            } as IUser;

            const userCreated = await this.userDao.createuser(userData);
            return userCreated;

        }catch(error) {
            throw new Error(`Erro ao criar user: ${error}`);
        }
    }

    public async getUserById(id: number): Promise<IUser | null> {
        try{
            const user = await this.userDao.getuserById(id);
            return user;
        }catch(error) {
            throw new Error(`Erro ao buscar user: ${error}`);
        }
    }

    public async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
        try{
            const user = await this.userDao.updateuser(id, userData);
            return user;
        }catch(error) {
            throw new Error(`Erro ao atualizar user: ${error}`);
        }
    }

    public async deleteUser(id: number): Promise<void> {
        try{
            await this.userDao.deleteuser(id);
        }catch(error) {
            throw new Error(`Erro ao excluir user: ${error}`);
        }
    }

    public async generateToken(email: string): Promise<string> {
        const token = jwt.sign({email}, 'secret', {expiresIn: '1h'});
        return token;
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, hash);
        return validPassword;
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try{
            const user = await this.userDao.getUserByEmail(email);
            return user;
        }catch(error) {
            throw new Error(`Erro ao buscar user: ${error}`);
        }
    }
}