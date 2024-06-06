import { DataTypes, Model } from "sequelize";
import { database } from "../data-source";
import { IUser } from "../interfaces/user/userInterface";

class User extends Model implements IUser{
  public id!: number;
  public name!: string;
  public company_name!: string;
  public email!: string;
  public email_recovery!: string;
  public password!: string;
  public cpf_cnpj!: string;
  public phone_number!: string;
  public profile_photo!: string;
  public reset_password_token!: string;
  public reset_password_expires!: Date;
  public deletion_requested_at!: Date;
  public deletion_scheduled_at!: Date;

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 45],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_recovery: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    deletion_requested_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletion_scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    tableName: "user",
    modelName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    scopes: {
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    },
  }
);

export default User;
