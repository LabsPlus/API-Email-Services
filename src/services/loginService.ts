import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LoginDao from '../repositories/dao/loginDao';
import { ILogin } from '../interfaces/login/loginInterface';

export default class LoginService {
    static checkLoginServiceStatus() {
      throw new Error('Method not implemented.');
    }
    private loginDao: LoginDao;

    constructor() {
        this.loginDao = new LoginDao();
    }

    public async createLogin({email,email_recovery,password}: ILogin): Promise<ILogin> {
        try
        {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const loginData = {
                email,
                email_recovery,
                password: hashedPassword,
            };

            const login = await this.loginDao.createLogin(loginData);
            return login;

        }catch(error) {
            throw new Error(`Erro ao criar login: ${error}`);
        }
    }

    public async getLoginById(id: number): Promise<ILogin | null> {
        try{
            const login = await this.loginDao.getLoginById(id);
            return login;
        }catch(error) {
            throw new Error(`Erro ao buscar login: ${error}`);
        }
    }

    public async getLoginByEmail(email: string): Promise<ILogin | null> {
        try{
            const login = await this.loginDao.getLoginByEmail(email);
            return login;
        }catch(error) {
            throw new Error(`Erro ao buscar login: ${error}`);
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

    public async checkLoginServiceStatus(): Promise<string> {
            
            const status = await this.loginDao.checkDatabaseConnection();
            return status;
    }

}