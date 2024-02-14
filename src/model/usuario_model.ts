import { Table, Column, Model, DataType,DefaultScope, AfterCreate, Length, ForeignKey, HasOne, HasMany } from 'sequelize-typescript';
import Login from './login_model';
import { IUsuario } from '../interfaces/usuario/usuarioInterface';
import Key from './key_model';

@DefaultScope(() => ({
    attributes: { exclude: ['created_at', 'updated_at'] },
}))

@Table({tableName: 'usuario'})
class Usuario extends Model{
    
    @Column({ type: DataType.INTEGER, field: 'id', primaryKey: true, autoIncrement: true})
    id!: number;

    @Length({min: 3, max: 45})
    @Column({type: DataType.STRING, field: 'name', allowNull: false})
    name!: string;

    @Length({min: 3, max: 45})
    @Column({type: DataType.STRING, field: 'company_name', allowNull: false})
    company_name!: string;
    
    @ForeignKey(() => Login)
    @Column({type: DataType.INTEGER, field: 'login_id', allowNull: false})
    login_id!: number;
        
    @HasOne(() => Login, {onDelete: 'CASCADE'})
    login!: Login;

    @HasMany(() => Key, {onDelete: 'CASCADE'})
    keys!: Key[];
    
    @AfterCreate({})
    static async excludeFields(usuario: IUsuario){
        const dataValues = usuario;
        delete dataValues.created_at;
        delete dataValues.updated_at;
    }
    
}

export default Usuario;