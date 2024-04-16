import Sequelize, { Model } from "sequelize";
// import database from "../configs/sequelize.config";
import { database } from "../data-source";

class Login extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public email_recovery!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Login.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email_recovery: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "login",
  }
);

export default Login;
