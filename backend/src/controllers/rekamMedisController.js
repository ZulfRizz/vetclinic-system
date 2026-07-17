const { where } = require("sequelize");
const { RekamMedis, Pasien, User } = require("../models");
const { getbyId } = require("./pasienController");

async function create(req,res) {
    try{
        const { pasien_id, keluhan, diagnosis, tindakan, berat_badan_saat_kunjungan, biaya_konsultasi } = req.body;

        const dokter_id = req.user.id;
        const rekamMedisBaru = await RekamMedis.create({
           pasien_id,
           dokter_id,
           keluhan,
           diagnosis,
           tindakan,
           berat_badan_saat_kunjungan,
           biaya_konsultasi,
        });
        res.status(201).json({message: 'Rekam medis berhasil dibuat', data: rekamMedisBaru});
    }catch(err){
        res.status(500).json({message: 'Gagal membuat rekam medis', error: err.message});
    };
}
    async function getByPasien(req, res) {
        try {
            const { pasienId } = req.params;
            const riwayat = await RekamMedis.findAll({
                where: { pasien_id: pasienId },
                include: [
                    { model: User, as: "dokter", attributes: ["id", "nama"] },
                ],
                order: [["tanggal_kunjungan", "DESC"]],
            });
            res.json(riwayat);
        } catch (err) {
            res.status(500).json({
                message: "Gagal mengambil riwayat rekam medis",
                error: err.message,
            });
        }
    }

module.exports = {create,getbyId,getByPasien};