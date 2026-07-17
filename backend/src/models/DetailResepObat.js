const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const DetailResepObat = sequelize.define('DetailResepObat',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jumlah:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    aturan_pakai: DataTypes.STRING,
    harga_saat_itu: DataTypes.DECIMAL(10,2),
},{
    tableName: 'detail_resep_obat',
    timestamps: true,
});

module.exports = DetailResepObat;
