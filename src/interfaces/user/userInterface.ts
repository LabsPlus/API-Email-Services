export interface IUser {
    id: number;
    name: string;
    cpf_cnpj: string;
    phone_number: string;
    email: string;
    email_recovery: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}