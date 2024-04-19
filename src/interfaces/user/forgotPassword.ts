export default interface IForgotPassword {

    email_recovery: string;
    token: string;
    expires: Date;
    ip: string | undefined;

}