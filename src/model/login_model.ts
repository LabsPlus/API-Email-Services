import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement, DataType, AllowNull, CreatedAt, UpdatedAt, AfterCreate, DefaultScope, Is, Unique, Length, HasOne } from 'sequelize-typescript';
import Usuario from './usuario_model';
import { ILogin } from '../interfaces/login/loginInterface';

@DefaultScope(() => ({
    attributes: { exclude: ['created_at', 'updated_at'] },
}))

@Table({tableName: 'login'})
class Login extends Model{
    
    
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id!: number;

    @Length({min: 3, max: 50})
    @Column({type: DataType.STRING, field: 'email', unique: true, allowNull: false})
    email!: string;

    @Length({min: 3, max: 50})
    @Column({type: DataType.STRING, field: 'email_recovery', unique: true, allowNull: false})
    email_recovery!: string;

    @Length({min: 3, max: 120})
    @Column({type: DataType.STRING, field: 'password', allowNull: false})
    password!: string;

    @ForeignKey(() => Usuario)
    @Column({type: DataType.INTEGER, field: 'usuario_id', allowNull: false})
    usuario_id!: number;

    @BelongsTo(() => Usuario)
    usuario!: Usuario;
    
    @AfterCreate({})
    static async excludeFields(login: ILogin){
        const dataValues = login;
        delete dataValues.created_at;
        delete dataValues.updated_at;
    }
}


export default Login;