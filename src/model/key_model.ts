import { DataTypes, Model } from "sequelize";
import { database } from "../data-source";
import User from "./user_model";
import { IKey } from "../interfaces/key/keyInterface";

class Key extends Model implements IKey{
  public id!: number;
  public name!: string;
  public value!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public is_active!: boolean;
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
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "key",
    modelName: "key",
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

Key.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default Key;
