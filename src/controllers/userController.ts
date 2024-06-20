import IForgotPassword from "../interfaces/user/forgotPassword";
import { IUser } from "../interfaces/user/userInterface";
import UserService from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { EmailChangeWithSuccessHtml } from "../utils/pages/email_change_with_success_html";
export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async createUser(request: Request, response: Response) {
        try {
            const { name, email, email_recovery, password, cpf_cnpj, phone_number } = request.body;

            if (!email || !email_recovery || !password || !cpf_cnpj || !phone_number || !name) {
                return response
                    .status(400)
                    .json({ error: "Erro ao criar login, faltam dados" });
            }

            const user = await this.userService.createUser({ name, email, email_recovery, password, cpf_cnpj, phone_number } as IUser);
            return response.status(201).json(user);
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            if (!email || !password) {
                return response.status(400).json({ error: 'Dados inválidos' });
            }

            const token = await this.userService.login(email, password);

            if (!token) {
                return response.status(401).json({ error: 'Falha ao logar' });
            }

            return response.status(200).json({ token: token });

        } catch (error) {
            return response.status(400).json(`${error}`);
        }
    }

    public async updateUser(request: Request, response: Response) {
        try {

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const userData = request.body;

            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const user = await this.userService.updateUser(accessToken, userData);

            return response.status(200).json(user);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to update user' + `${error}` });
        }
    }

    public async deleteUser(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);
            await this.userService.deleteUser(id);
            return response.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to delete user' });
        }
    }

    public async scheduleUserDeletion(request: Request, response: Response) {
        try {

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const serviceResponse = await this.userService.scheduleUserDeletion(accessToken);
            return response.status(200).json({ message: serviceResponse });
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async reactivateUserProfile(request: Request, response: Response) {
        try {

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const serviceResponse = await this.userService.reactivateUser(accessToken);
            return response.status(200).json({ message: serviceResponse });
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }


    public async forgotPassword(request: Request, response: Response) {
        try {
            const email_recovery: string = request.body.email_recovery;
            const ip: string = request.body.ip;

            const userRecovery = {
                ip: ip,
                email_recovery: email_recovery,
            } as IForgotPassword;

            if (!email_recovery) {
                return response.status(400).json({ error: 'Email não informado' });
            }

            const user = await this.userService.getUserByEmailRecovery(email_recovery);

            if (typeof (user) === "string") {
                return response.status(404).json({ error: user });
            }

            const forgotPassword = await this.userService.forgotPassword(userRecovery);

            if (forgotPassword) {
                return response.status(200).json({ message: forgotPassword });
            }

            return response.status(400).json({ error: 'Falha ao enviar email' });
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async updatePassword(request: Request, response: Response) {

        try {
            const { token, password } = request.body;

            if (!token || !password) {
                return response.status(400).json({ error: 'Dados inválidos' });
            }

            const updatedPassword = await this.userService.updatePassword(token, password);

            if (updatedPassword) {
                return response.status(200).json({ message: 'Senha alterada com sucesso' });
            }

            return response.status(401).json({ error: 'Falha ao alterar senha' });
        }
        catch (error) {
            return response.status(500).json({ error: `${error}`});
        }
    }

    public async getUserByAccessToken(request: Request, response: Response) {
        try {


            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const userData = request.body;


            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const user = await this.userService.getUserByAccessToken(accessToken);

            return response.status(200).json(user);
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async logout(request: Request, response: Response) {
        try {
            const token = request.body.accessToken;

            if (!token) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            if (typeof (token) !== "string") {
                return response.status(400).json({ error: 'Token inválido' });
            }

            const logout = await this.userService.logout(token);

            if (logout) {
                return response.status(200).json({ message: 'Usuário deslogado com sucesso' });
            }

            return response.status(400).json({ error: 'Falha ao deslogar' });
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }


    public async validateUserPassword(request: Request, response: Response) {

        try {

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }


            const { password } = request.body;

            if (!password) {
                return response.status(400).json({ error: 'Senha não informada' });
            }

            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const isValidPassword = await this.userService.validateUserPassword(password, accessToken);

            if (!isValidPassword) {
                return response.status(200).json({ message: 'Senha inválida', isValidPassword: false });
            }

            return response.status(200).json({ message: 'Senha válida', isValidPassword: true });

        } catch (error) {
            return response.status(400).json(`${error}`);
        }
    }

    public async isLoggedIn(request: Request, response: Response) {

        try {
            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const isLoggedIn = await this.userService.isLoggedIn(accessToken);

            if (!isLoggedIn) {
                return response.status(200).json({ message: 'Usuário não está logado', isLoggedIn: false });
            }

            return response.status(200).json({ message: 'Usuário está logado', isLoggedIn: true });

        } catch (error) {
            return response.status(400).json(`${error}`);
        }
    }

    public async getAllKeysFromUser(request: Request, response: Response) {

        try {

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            if (!accessToken) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const keys = await this.userService.getAllKeysFromUser(accessToken);

            return response.status(200).json(keys);
        }
        catch (error) {
            return response.status(400).json(`${error}`);
        }
    }


    public async requestUpdateEmail(request: Request, response: Response) {
        try {
            const { email } = request.body;

            if (!email) {
                return response.status(400).json({ error: 'Email não informado' });
            }

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const updatedEmail = await this.userService.requestUpdateEmail(email, accessToken);

            if (updatedEmail) {
                return response.status(200).json(updatedEmail);
            }

            return response.status(400).json({ error: 'Falha ao atualizar email' });

        } catch (error) {
            return response.status(400).json(`${error}`);
        }
    }


    public async requestUpdateEmailRecovery(request: Request, response: Response) {
        try {
            const { email_recovery } = request.body;

            if (!email_recovery) {
                return response.status(400).json({ error: 'Email de recuperação não informado' });
            }

            if (!request.headers.authorization) {
                return response.status(400).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(400).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const updatedEmailRecovery = await this.userService.requestUpdateEmailRecovery(email_recovery, accessToken);

            if (updatedEmailRecovery) {
                return response.status(200).json(updatedEmailRecovery);
            }

            return response.status(400).json({ error: 'Falha ao atualizar email de recuperação' });

        } catch (error) {
            return response.status(400).json(`${error}`);
        }
    }


    public async updateEmail(request: Request, response: Response) {
        try {

            const { UpdateEmailToken, IdUser } = request.query;

            if (!UpdateEmailToken && !IdUser) {
                return response.status(400).json({ error: 'Tokens não informados' });
            }

            const updatedEmail = await this.userService.updateEmailByToken(UpdateEmailToken as string, IdUser as string);

            if (!updatedEmail) {
                return response.status(400).json({ error: 'Falha ao atualizar email' });
            }

            return response.status(200).send(EmailChangeWithSuccessHtml.message());

        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }


    public async updateEmailRecovery(request: Request, response: Response) {
        try {
            const { UpdateEmailRecoveryToken, IdUser } = request.query;

            if (!UpdateEmailRecoveryToken && !IdUser) {
                return response.status(400).json({ error: 'Tokens não informados' });
            }

            const updatedEmailRecovery = await this.userService.updateEmailRecoveryByToken(UpdateEmailRecoveryToken as string, IdUser as string);

            if (!updatedEmailRecovery) {
                return response.status(400).json({ error: 'Falha ao atualizar email de recuperação' });
            }

            return response.status(200).send(EmailChangeWithSuccessHtml.message());

        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async setFlagValueRememberPasswordChange(request: Request, response: Response) {

        try {

            if (!request.headers.authorization) {
                return response.status(401).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(401).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const { remember_password_change_is_enable } = request.body;

            if (remember_password_change_is_enable === undefined || remember_password_change_is_enable === null) {
                return response.status(400).json({ error: 'Flag não informada' });
            }

            await this.userService.setFlagValueRememberPasswordChange(accessToken, remember_password_change_is_enable);

            return response.status(200).json({ message: 'Flag atualizada com sucesso' });
        }
        catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }

    public async isFlagRememberPasswordChangeEnable(request: Request, response: Response) {

        try {

            if (!request.headers.authorization) {
                return response.status(401).json({ error: 'Token não informado' });
            }

            const parts = request.headers.authorization?.split(' ');

            if (!parts || parts.length < 2) {
                return response.status(401).json({ error: 'Token inválido' });
            }

            let accessToken = null;

            if (parts[0] === 'Bearer') {
                accessToken = parts[1];
            }
            else {
                accessToken = parts[1];
            }

            const isFlaggEnable: boolean = await this.userService.isFlagRememberPasswordChangeEnable(accessToken);

            return response.status(200).json({ isFlaggEnable: isFlaggEnable });
        } catch (error) {
            return response.status(400).json({ error: `${error}` });
        }
    }
}
