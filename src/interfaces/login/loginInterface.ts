export interface ILogin {
    id?: number;
    email: string;
    email_recovery: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}