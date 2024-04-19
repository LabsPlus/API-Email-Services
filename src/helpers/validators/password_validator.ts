export default class PasswordValidator {

    // As regras para o password são: minimo 8 caracteres, pelo menos uma letra maiuscula, uma letra minuscula e um numero
    private static readonly PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    public static isValid(password: string): boolean {
        return this.PASSWORD_REGEX.test(password);
    }

    public static getErrorMessage(): string {
        return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
    }
}