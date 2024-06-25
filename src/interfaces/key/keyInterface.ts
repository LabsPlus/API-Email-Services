export interface IKey {
    id: number;
    name: string;
    value: string;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    is_active: boolean;
}
