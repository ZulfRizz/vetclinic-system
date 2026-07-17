const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pemilik = sequelize.define(
    "Pemilik",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_telepon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat: { type: DataTypes.TEXT },
        email: { type: DataTypes.STRING },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "pemilik",
        timestamps: true,
    },
);

module.exports = Pemilik;
