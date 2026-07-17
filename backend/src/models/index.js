const sequelize = require("../config/database");
const User = require("./User");
const Pemilik = require("./Pemilik");
const Pasien = require("./Pasien");
const RekamMedis = require("./RekamMedis");
const DetailResepObat = require("./DetailResepObat");

// ===== RELASI =====

// User (klien) - Pemilik : One-to-One (opsional)
// setara: $user->hasOne(Pemilik::class) & $pemilik->belongsTo(User::class)
User.hasOne(Pemilik, { foreignKey: "user_id" });
Pemilik.belongsTo(User, { foreignKey: "user_id" });

// Pemilik - Pasien : One-to-Many
// setara: $pemilik->hasMany(Pasien::class)
Pemilik.hasMany(Pasien, { foreignKey: "pemilik_id" });
Pasien.belongsTo(Pemilik, { foreignKey: "pemilik_id" });

// Pasien - RekamMedis : One-to-Many
Pasien.hasMany(RekamMedis, { foreignKey: "pasien_id" });
RekamMedis.belongsTo(Pasien, { foreignKey: "pasien_id" });

// User (dokter) - RekamMedis : One-to-Many
// Dokter mana yang menulis rekam medis ini
RekamMedis.belongsTo(User, { foreignKey: "dokter_id", as: "dokter" });
// "as: 'dokter'" penting - karena User dipakai 2x (relasi ke Pemilik & ke RekamMedis),
// alias ini mencegah ambigu saat query nanti (mirip fungsi alias tabel di SQL JOIN)

// RekamMedis - DetailResepObat : One-to-Many
RekamMedis.hasMany(DetailResepObat, { foreignKey: "rekam_medis_id" });
DetailResepObat.belongsTo(RekamMedis, { foreignKey: "rekam_medis_id" });

module.exports = {
    sequelize,
    User,
    Pemilik,
    Pasien,
    RekamMedis,
    DetailResepObat,
};
