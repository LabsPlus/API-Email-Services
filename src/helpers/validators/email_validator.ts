export default class EmailValidator {
    
    public async isEmailValid(email: string): Promise <boolean> {
        const emailRegex = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    }
}