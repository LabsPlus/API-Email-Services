import { IUser } from "../interfaces/user/userInterface";
import UserDao from "../repositories/dao/userDao";

export default class UserService {

    private userDao: UserDao;
  static checkUserServiceStatus: any;

    constructor() {
        this.userDao = new UserDao();
    }

    public async createUser({name, company_name, login_id}: IUser): Promise<IUser> {
        try
        {
            const userData = { 
                name,
                company_name,
                login_id,
            } as IUser;

            const user = await this.userDao.createuser(userData);
            return user;

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
}