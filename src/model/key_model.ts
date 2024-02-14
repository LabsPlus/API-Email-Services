import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull, CreatedAt, UpdatedAt, DefaultScope, AfterCreate, HasMany, Length, ForeignKey, HasOne } from 'sequelize-typescript';
import { IKey } from '../interfaces/key/keyInterface';
import Usuario from './usuario_model';

@DefaultScope(() => ({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
}))
@Table({tableName: 'key'})
class Key extends Model{

    @Column({ type: DataType.INTEGER, field: 'id', primaryKey: true, autoIncrement: true})
    id!: number;

    @Length({min: 3, max: 45})
    @Column({type: DataType.STRING, field: 'name', allowNull: false})
    name!: string;

    @Length({min: 3, max: 120})
    @Column({type: DataType.STRING, field: 'value',unique: true, allowNull: false})
    value!: string;

    @HasOne(() => Usuario, {onDelete: 'CASCADE'})
    @ForeignKey(() => Usuario)
    @Column({type: DataType.INTEGER, field: 'id_usuario', allowNull: false})
    id_usuario!: number;

    @AfterCreate({})
    static excludeFields(key: IKey){
        const dataValues = key;
        delete dataValues.createdAt;
        delete dataValues.updatedAt;
    }
}

export default Key;