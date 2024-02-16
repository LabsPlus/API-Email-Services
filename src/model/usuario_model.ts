import { DataTypes, Model, ForeignKey, HasOne, HasMany } from 'sequelize';
import Login from './login_model';
import database from '../configs/sequelize.config';

class Usuario extends Model {
    public id!: number;
    public name!: string;
    public company_name!: string;
    public login_id!: number;
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 45]
            }
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
      },
        login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'login',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        sequelize: database,
        tableName: 'usuario',
        modelName: 'Usuario',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        scopes: {
            defaultScope: {
                attributes: { exclude: ['created_at', 'updated_at'] }
            }
        }
    }
);

Usuario.belongsTo(Login, {
    foreignKey: 'login_id',
    as: 'login'
});

export default Usuario;
