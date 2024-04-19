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
            throw new Error(`Erro ao buscar user: ${error}`);
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

        if (!email) {
            throw ('Email não informado');
        }

        if (!await this.emailValidator.isEmailValid(email)) {
            throw ('Email inválido');
        }

        if (!await this.checkEmailExists(email)) {
            throw ('Email não encontrado');
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });


        return token;
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

    /**
     * 
     *  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new ErrorsHelpers({
        message: 'Refresh token missing',
        statusCode: 401,
      });
    }
    let secretKeyRefresh: string | undefined =
      process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
    if (!secretKeyRefresh) {
      throw new ErrorsHelpers({
        message: 'There is no refresh token key',
        statusCode: 401,
      });
    }

    let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
    if (!secretKey) {
      throw new ErrorsHelpers({
        message: 'There is no refresh token key',
        statusCode: 401,
      });
    }

    const verifyRefreshToken = verify(refreshToken, secretKeyRefresh);

    const { sub } = verifyRefreshToken;

    const newToken = sign({ sub }, secretKey, {
      expiresIn: '1h',
    });
    const newRefreshToken = sign({ sub }, secretKeyRefresh, {
      expiresIn: '7d',
    });
    return {
      token: { token: newToken, expiresIn: '1h' },
      refreshToken: { refreshToken: newRefreshToken, expiresIn: '7d' },
    };
  }

  async updatePassword({ newPassword, token }: ILoginUpdatePassword) {
    if (token === undefined) {
      throw new ErrorsHelpers({
        message: 'Token is Undefined',
        statusCode: 401,
      });
    }
    const findLoginByToken = await this.loginDALs.findLoginByToken(token);
    if (!findLoginByToken) {
      throw new ErrorsHelpers({
        message: 'There is no user.repositories with this token',
        statusCode: 401,
      });
    }

    const now = new Date();

    if (
      findLoginByToken.resetTokenExpiry &&
      now > findLoginByToken.resetTokenExpiry
    ) {
      throw new ErrorsHelpers({
        message: 'Sorry the token expired',
        statusCode: 401,
      });
    }

    const passwordHash = await hash(newPassword, 10);

    const result = await this.loginDALs.updatePassword({
      newPassword: passwordHash,
      email: findLoginByToken.email,
    });
    return result;
  }

  async forgotPassword({ email, ip }: ILoginForgotPassword) {
    if (ip === undefined) {
      throw new ErrorsHelpers({ message: 'Cannot find ip', statusCode: 401 });
    }
    if (this.rateLimitUtils.verifyBlock(ip)) {
      throw new ErrorsHelpers({
        message: 'Too many requests. This IP has been blocked for 15 minutes',
        statusCode: 401,
      });
    }

    const findLoginByEmail = await this.loginDALs.findLoginByEmail(email);
    if (!findLoginByEmail) {
      const actualAttempts = this.invalidAttempts.get(ip) || 0;
      this.invalidAttempts.set(ip, actualAttempts + 1);

      if (actualAttempts + 1 === 3) {
        this.rateLimitUtils.blockIp(ip);
      }
      throw new ErrorsHelpers({ message: 'User not found', statusCode: 401 });
    }

    const resetToken = await hash(
      findLoginByEmail.emailRecovery + Date.now(),
      10,
    );
    const resetTokenExpiry = new Date(Date.now() + 3600000);
    const token = await this.loginDALs.updateResetToken({
      resetToken,
      resetTokenExpiry,
      email: findLoginByEmail.email,
    });

    const resetLink = `${
      process.env.FRONTEND_URL_DEV || process.env.FRONTEND_URL_MAIN
    }/nova-senha?token=${token.resetToken}`;
    const sendEmail = await this.emailUtils.sendEmail({
      destination: findLoginByEmail.emailRecovery,
      subject: 'Recuperação de senha',
      content: this.htmlMessages.forgotPasswordMessage(resetLink),
    });

    if (!sendEmail) {
      throw new ErrorsHelpers({ message: 'Error send email', statusCode: 401 });
    }

    return sendEmail;
  }

     */

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

            if (RateLimit.isRateLimited(user.ip)){
                throw ('Muitas tentativas, este IP foi bloqueado por 15 minutos');
            }

            const userFound = await this.userDao.getUserByEmailRecovery(user.email_recovery);

            if (!userFound) {
                RateLimit.addInvalidAttempt(user.ip);
                throw ('Usuário não encontrado');
            }

            const resetToken = jwt.sign({ email: user.email_recovery }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            const resetLink = `${process.env.FRONT_END_URL}/new-password?token=${resetToken}`;

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

            if (PasswordValidator.isValid(newPassword)) {
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
                throw ('Usuário não encontrado');
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



}