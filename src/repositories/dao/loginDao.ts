import Login from '../../model/login_model';
import { ILogin } from '../../interfaces/login/loginInterface';

export default class LoginDao {

    public async createLogin({email,email_recovery,password,id,created_at,updated_at}: ILogin): Promise<ILogin> {
        try{
            const loginData = {
                email,
                email_recovery,
                password,
                id,
                created_at,
                updated_at
            };

            const login = await Login.create(loginData);
            return login;
        }catch(error) {
            throw new Error(`Erro ao criar login: ${error}`);
        }
    }

    public async getLoginById(id: number): Promise<ILogin | null> {
        try{
            const login = await Login.findByPk(id);
            return login;
        }catch(error) {
            throw new Error(`Erro ao buscar login: ${error}`);
        }
    }

    public async getLoginByEmail(email: string): Promise<ILogin | null> {
        try{
            const login = await Login.findOne({where: {email}});
            return login;
        }catch(error) {
            throw new Error(`Erro ao buscar login: ${error}`);
        }
    }
}