export interface IUser {
    id: number;
    name: string;
    cpf_cnpj: string;
    phone_number: string;
    email: string;
    email_recovery: string;
    password: string;
    reset_password_token: string;
    reset_password_expires: Date;
    created_at?: Date;
    updated_at?: Date;
}