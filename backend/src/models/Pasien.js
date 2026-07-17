const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Pasien = sequelize.define('Pasien',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    spesies: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ras: DataTypes.STRING,
    jenis_kelamin: {
        type: DataTypes.ENUM('jantan','betina'),
        allowNull: false,
    },
    tanggal_lahir: DataTypes.DATEONLY,
    berat_badan: DataTypes.DECIMAL(5,2),
    warna: DataTypes.STRING,
    foto_url: DataTypes.STRING,
    catatan_alergi: DataTypes.TEXT
},{
    tableName: 'pasien',
    timestamps: true,
});

module.exports = Pasien;