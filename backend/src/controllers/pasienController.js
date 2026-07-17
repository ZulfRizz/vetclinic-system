const {Pasien,Pemilik,RekamMedis,User} = require('../models');

async function create(req,res) {
    try{
        const {nama, spesies, ras, jenis_kelamin, tanggal_lahir, berat_badan, pemilik_id} = req.body;
        const pasienBaru = await Pasien.create({
            nama, spesies, ras, jenis_kelamin, tanggal_lahir, berat_badan, pemilik_id, 
        });

        res.status(201).json({message: 'Pasien berhasil didaftarkan', data: pasienBaru});
    }catch(err){
        res.status(500).json({message: 'Gagal mendaftarkan pasien', error: err.message})
    }
}

async function getAll(req,res) {
    try{
        const daftarPasien = await Pasien.findAll({
            include: [{model: Pemilik}],
            order: [['createdAt','DESC']],
        });
        res.json(daftarPasien);
    }catch(err){
        res.status(500).json({message: 'Gagal mengambil data pasien', error: err.message})
    }
}

async function getById(req,res) {
    try{
        const {id} = req.params;
        const pasien = await Pasien.findByPk(id,{
            include: [
                {model: Pemilik},
                {
                 model: RekamMedis,
                 include: [{User, as: 'dokter', attributes: ['id','nama']}],
                 order: [['tanggal_kunjungan','DESC']]
                },
            ],
        });
        if(!pasien){
            return res.status(404).json({message: 'Pasien tidak ditemukan'});
        };

        res.json(pasien);
    }catch(err){
        res.status(500).json({message: 'Gagal mengambil detail pasien', error: err.message});
    }
}

async function update(req,res) {
    try{
        const {id} = req.params;
        const pasien = await Pasien.findByPk(id);

        if(!pasien){
            return res.status(404).json({message: 'Pasien tidak ditemukan'});
        };

        await pasien.update(req.body);
        res.json({message: 'Data pasien berhasil diperbarui', data: pasien});
    }catch(err){
        res.status(500).json({message: 'Gagal memperbarui data pasien', error: err.message});
    }
}

module.exports = {create,getAll,getById,update};