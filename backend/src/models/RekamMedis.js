const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RekamMedis = sequelize.define('RekamMedis',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal_kunjungan: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    keluhan: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    diagnosis: DataTypes.TEXT,
    tindakan: DataTypes.TEXT,
    berat_badan_saat_kunjungan: DataTypes.DECIMAL(5,2),
    biaya_konsultasi: {
        type: DataTypes.DECIMAL(5,2),
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM('berjalan','selesai'),
        defaultValue: 'berjalan',
    },
},{
  tableName: 'rekam_medis',
  timestamps: true,  
});

module.exports = RekamMedis;