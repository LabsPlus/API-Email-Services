import { DataTypes, Model } from "sequelize";
import Usuario from "./user_model";
import { database } from "../data-source";

class Key extends Model {
  public id!: number;
  public name!: string;
  public value!: string;
}

Key.init(
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
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 120],
      },
    },
  },
  {
    sequelize: database,
    tableName: "key",
    modelName: "Key",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    scopes: {
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    },
  }
);

Key.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  as: "usuario",
});

export default Key;
