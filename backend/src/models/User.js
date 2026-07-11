const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(
                'owner', 'dokter', 'paramedis', 'resepsionis', 'kasir', 'staf_inventori', 'klien'
            ),
            allowNull: false,
        },
        status_aktif: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'users',
        timestamps: true
    }
);

module.exports = User;