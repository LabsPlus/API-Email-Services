import { IUser } from "../interfaces/user/userInterface";
import { Email } from "../interfaces/email/Imail";
import UserDao from "../repositories/dao/userDao";
import EnqueueService from "./enqueueService";
import { EmailService } from "./emailService";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ForgotPasswordMessage } from "../utils/messages/forgot_password_message";
import CpfCnpjValidator from "../helpers/validators/cpf_cnpj_validator";
import EmailValidator from "../helpers/validators/email_validator";
import PasswordValidator from "../helpers/validators/password_validator";
import RateLimit from "../utils/functions/rateLimit";
import IForgotPassword from "../interfaces/user/forgotPassword";
import CacheService from "./cacheService";

export default class UserService {

    private userDao: UserDao;
    static checkUserServiceStatus: any;
    private enqueueService: EnqueueService;
    private emailService: EmailService;
    private cpfCnpjValidator: CpfCnpjValidator;
    private emailValidator: EmailValidator;
    private cacheService: CacheService;

    constructor() {
        this.userDao = new UserDao();
        this.enqueueService = new EnqueueService();
        this.emailService = new EmailService();
        this.cpfCnpjValidator = new CpfCnpjValidator();
        this.emailValidator = new EmailValidator();
        this.cacheService = new CacheService();
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

            if (!PasswordValidator.isValid(user.password)) {
                throw ('Senha inválida, a senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número');
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
            throw new Error(`${error}`);
        }
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await this.userDao.getUserByEmail(email);
            return user;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async getUserByEmailRecovery(email_recovery: string): Promise<IUser | null> {
        try {
            const user = await this.userDao.getUserByEmailRecovery(email_recovery);
            return user;
        } catch (error) {
            throw (`${error}`);
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

    public async checkEmailRecoveryExists(email_recovery: string): Promise<boolean> {
        try {
            if (await this.userDao.getUserByEmailRecovery(email_recovery)) {
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`${error}`);
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

    public async updateUser(token: string, userData: Partial<IUser>): Promise<IUser | null> {

        try {

            if (!token) {
                throw ('Token não informado');
            }

            const id = await this.cacheService.getCache(token);

            if (!id) {
                throw ('Usuario não encontrado');
            }

            if (userData.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(userData.password, salt);
                userData.password = hashedPassword;
            }

            const user = await this.userDao.updateuser(parseInt(id), userData);
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


    public async scheduleUserDeletion(accessToken: string): Promise<string> {

        try {

            if (!accessToken) {
                throw ('Token não informado');
            }

            const timeToDelete = 2592000000;
            const scheduleDate = new Date(Date.now() + timeToDelete);

            const id = await this.cacheService.getCache(accessToken);

            if (!id) {
                throw ('Usuario não encontrado');
            }

            const user = await this.userDao.getuserById(parseInt(id));

            if (!user) {
                throw ('Usuário não encontrado');
            }

            const response = await this.userDao.scheduleUserDeletion(user.id, scheduleDate);

            return response;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async deleteUserByDeletionScheduledAt(): Promise<void> {

        try {

            const todayDate = new Date();
            await this.userDao.deleteUserByDeletionScheduledAt(todayDate);

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async reactivateUser(accessToken: string): Promise<string> {

        try {

            if (!accessToken) {
                throw ('Token não informado');
            }

            const id = await this.cacheService.getCache(accessToken);

            if (!id) {
                throw ('ID não encontrado no cache');
            }

            const user = await this.userDao.getuserById(parseInt(id));

            if (!user) {
                throw ('Usuário não encontrado');
            }

            const response = await this.userDao.reactivateUser(user.id);

            return response;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }


    public async generateAccessToken(id: number): Promise<string> {

        if (!id) {
            throw ('ID não informado');
        }

        const user = await this.userDao.getuserById(id);

        if (!user) {
            throw ('Usuário não encontrado');
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '2h' });

        this.cacheService.setCache(token, user.id.toString());

        return token;
    }

    public async login(email: string, password: string): Promise<string> {
        try {

            if (!email) {
                throw ('Email não informado');
            }

            if (!password) {
                throw ('Senha não informada');
            }

            if (!await this.emailValidator.isEmailValid(email)) {
                throw ('Email inválido');
            }

            if (!await this.checkEmailExists(email)) {
                throw ('Email não encontrado');
            }

            const user = await this.userDao.getUserByEmail(email);

            if (!user) {
                throw ('Usuário não encontrado');
            }

            const validPassword = await this.comparePassword(password, user.password);

            if (!validPassword) {
                throw ('Senha inválida');
            }

            const token = await this.generateAccessToken(user.id);

            return token;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }


    public async comparePassword(password: string, hash: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, hash);
        return validPassword;
    }

    public async forgetPasswordToken(email: string): Promise<string> {
        try {

            if (!(await this.emailValidator.isEmailValid(email))) {
                throw ('Email inválido');
            }

            const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            return token;
        } catch (error) {
            throw (`${error}`);
        }
    }

    public async verifyResetPasswordToken(token: string): Promise<boolean> {
        try {

            if (!token) {
                throw ('Token não informado');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            if (decoded) {
                return true;
            }

            return false;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async forgotPassword(user: IForgotPassword): Promise<string> {

        try {

            if (!user.email_recovery) {
                throw ('Email de recuperação não informado');
            }

            if (!user.ip) {
                throw ('IP não informado');
            }

            if (!await this.emailValidator.isEmailValid(user.email_recovery)) {
                throw ('Email de recuperação inválido');
            }

            if (!await this.checkEmailRecoveryExists(user.email_recovery)) {
                throw ('Email não encontrado');
            }

            if (RateLimit.isRateLimited(user.ip)) {
                throw ('Muitas tentativas, este IP foi bloqueado por 15 minutos');
            }

            const userFound = await this.userDao.getUserByEmailRecovery(user.email_recovery);

            if (!userFound) {
                RateLimit.addInvalidAttempt(user.ip);
                throw ('Usuário não encontrado');
            }

            const resetToken = jwt.sign({ email: user.email_recovery }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            const resetLink = `${process.env.FRONT_END_URL}/new-password?ResetPasswordToken=${resetToken}`;

            this.userDao.updateUserResetPasswordToken(user.email_recovery, resetToken, new Date(Date.now() + 3600000));

            const emailData = {
                from: process.env.EMAIL_LABS_CLIENT as string,
                to: user.email_recovery,
                subject: 'Recuperação de senha',
                text: ForgotPasswordMessage.forgotPasswordMessage(resetLink),
                html: ForgotPasswordMessage.forgotPasswordMessage(resetLink),
                apiKey: process.env.API_EMAIL_KEY as string,
            } as Email;

            const emailSent = await this.emailService.sendEmail(emailData);

            if (!emailSent) {
                throw ('Erro ao enviar email');
            }

            RateLimit.clearInvalidAttempts(user.ip);

            return emailSent;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async updatePassword(token: string, newPassword: string): Promise<string> {
        try {

            if (!token) {
                throw ('Token não informado');
            }

            if (!newPassword) {
                throw ('Nova senha não informada');
            }

            if (!await this.verifyResetPasswordToken(token)) {
                throw ('Token inválido');
            }

            if (!PasswordValidator.isValid(newPassword)) {
                throw ('Senha inválida, a senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            if (!decoded) {
                throw ('Erro ao alterar senha');
            }

            const email = decoded.email;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            const user = await this.userDao.getUserByResetPasswordToken(token);

            if (!user) {
                throw ('Esse codigo de recuperação de senha não é válido, por favor solicite um novo código de recuperação de senha');
            }

            const userUpdated = await this.userDao.updateUserPassword(email, hashedPassword);

            if (!userUpdated) {
                throw ('Erro ao alterar senha');
            }

            return 'Senha alterada com sucesso';


        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async getUserByAccessToken(token: any): Promise<IUser | null> {
        try {


            if (!token) {
                throw ('Token não informado');
            }

            if (typeof (token) !== "string") {
                throw ('Token inválido');
            }


            const id = await this.cacheService.getCache(token);


            const user = await this.userDao.getuserById(parseInt(id));

            if (!user) {
                throw ('Usuário não encontrado');
            }

            return user;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async validateUserPassword(password: string, accessToken: string): Promise<boolean> {
        try {

            if (!password) {
                throw ('Senha não informada');
            }

            if (!accessToken) {
                throw ('Token não informado');
            }

            const id = await this.cacheService.getCache(accessToken);

            if (!id) {
                throw ('Usuario não encontrado');
            }

            const user = await this.userDao.getuserById(parseInt(id));

            if (!user) {
                throw ('Usuário não encontrado');
            }

            const validPassword = await this.comparePassword(password, user.password);

            if (!validPassword) {
                return false;
            }

            return true;

        } catch (error) {
            throw new Error(`${error}`);
        }

    }

    public async isLoggedIn(token: string): Promise<boolean> {
        try {

            if (!token) {
                throw ('Token não informado');
            }

            const id = await this.cacheService.getCache(token);

            if (!id) {
                return false;
            }

            return true;

        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    public async logout(token: string): Promise<string> {
        try {

            if (!token) {
                throw ('Token não informado');
            }

            this.cacheService.deleteCache(token);

            return 'Usuário deslogado';

        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}