export default class EmailValidator {
    
    public async isEmailValid(email: string): Promise <boolean> {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
}