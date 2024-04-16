import { IUser } from "../interfaces/user/userInterface";
import { Email } from "../interfaces/email/Imail";
import UserDao from "../repositories/dao/userDao";
import EnqueueService from "./enqueueService";
import { EmailService } from "./emailService";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ForgotPasswordMessage } from "../utils/messages/forgot_password_message";
import CpfCnpjValidator from "../helpers/validators/cpf_cnpj_validator";
import EmailValidator from "../helpers/validators/email_validator";

export default class UserService {

    private userDao: UserDao;
    static checkUserServiceStatus: any;
    private enqueueService: EnqueueService;
    private emailService: EmailService;
    private cpfCnpjValidator: CpfCnpjValidator;
    private emailValidator: EmailValidator;

    constructor() {
        this.userDao = new UserDao();
        this.enqueueService = new EnqueueService();
        this.emailService = new EmailService();
        this.cpfCnpjValidator = new CpfCnpjValidator();
        this.emailValidator = new EmailValidator();
    }

    public async createUser(user: IUser): Promise<IUser> {
        try {
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

            if (!await this.cpfCnpjValidator.isCpfCnpjValid(user.cpf_cnpj)) {
                throw ('Numero para CPF/CNPJ inválido');
            }

            if (!await this.emailValidator.isEmailValid(user.email)) {
                throw ('Email inválido');
            }

            if (!await this.emailValidator.isEmailValid(user.email_recovery)) {
                throw ('Email de recuperação inválido');
            }

            if (await this.checkUserExists(user)) {
                throw ('Usuário já existe');
            }

            const userCreated = await this.userDao.createuser(userData);
            return userCreated;

        } catch (error) {
            throw (`${error}`);
        }
    }

    public async getUserById(id: number): Promise<IUser | null> {
        try {
            const user = await this.userDao.getuserById(id);
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar user: ${error}`);
        }
    }

    public async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
        try {
            const user = await this.userDao.updateuser(id, userData);
            return user;
        } catch (error) {
            throw new Error(`Erro ao atualizar user: ${error}`);
        }
    }

    public async deleteUser(id: number): Promise<void> {
        try {
            await this.userDao.deleteuser(id);
        } catch (error) {
            throw new Error(`Erro ao excluir user: ${error}`);
        }
    }

    public async generateToken(email: string): Promise<string> {
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
        return token;
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, hash);
        return validPassword;
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await this.userDao.getUserByEmail(email);
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar user: ${error}`);
        }
    }

    public async checkUserExists(user: IUser): Promise<boolean> {

        try {

            if (await this.userDao.getUserByEmail(user.email)) {
                return true;
            }

            if (await this.userDao.getUserByCpfOrCnpj(user.cpf_cnpj)) {
                return true;
            }

            if (await this.userDao.getUserByEmailRecovery(user.email)) {
                return true;
            }

            if (await this.userDao.getUserByPhoneNumber(user.phone_number)) {
                return true;
            }

            return false;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async forgetPasswordToken(email: string): Promise<string> {
        try {

            if (!(await this.emailValidator.isEmailValid(email))) {
                throw ('Email inválido');
            }

            const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

            return token;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async forgetPassword(email: string): Promise<string> {

        try {
            if (!this.checkEmailExists(email)) {
                throw new Error('Email não encontrado');
            }
            const token = await this.forgetPasswordToken(email);

            const emailData = {
                to: email,
                subject: 'Recuperação de senha',
                html: ForgotPasswordMessage.forgotPasswordMessage(token),
                apiKey: process.env.API_EMAIL_KEY as string,
                from: process.env.EMAIL_LABS_CLIENT as string,
            } as Email;

            if (token !== null) {
                const response = await this.emailService.sendEmail(emailData);
                this.enqueueService.enqueueEmail(emailData);
                return response;
            }

            return 'Erro ao enviar email';


        } catch (error) {
            throw new Error(`Erro ao buscar user: ${error}`);
        }

    }


    public async checkEmailExists(email: string): Promise<boolean> {
        try {
            if (await this.userDao.getUserByEmail(email)) {
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

}