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
    deletion_requested_at: Date;
    deletion_scheduled_at: Date;
    profile_photo?: string;
    created_at?: Date;
    updated_at?: Date;
    password_updated_at?: Date;
    remember_password_change_at?: Date;
    remember_password_change_is_enable?: boolean;
}