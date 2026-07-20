const {Pemilik, Pasien} = require('../models');

async function create(req, res) {
    try{
        const {nama, no_telepon, alamat, email, user_id} = req.body;
        const pemilikBaru = await Pemilik.create({
            nama,
            no_telepon,
            alamat,
            email,
            user_id: user_id || null,
        });
        res.status(201).json({message: 'Pemilik berhasil didaftarkan', data: pemilikBaru});
    }catch(err){
        res.status(500).json({message: 'Gagal mendaftar pemilik', error: err.message});
    }
}

async function getAll(req,res) {
    try{
        const daftarPemilik = await Pemilik.findAll({
            include: [{model: Pasien}],
            order: [['createdAt', 'DESC']],
        });
        res.json(daftarPemilik);
    }catch(err){
        res.status(500).json({message:'Gagal mengambil data pemilik', error: err.message});
    };
}

async function getById(req,res) {
    try{
        const {id} = req.params;

        const pemilik = await Pemilik.findByPk(id,{
            include: [{model: Pasien}],
        });

        if(!pemilik) {
            return res.status(404).json({message: 'Pemilik tidak ditemukan'});
        }
        res.json(pemilik);
    }catch(err){
        res.status(500).json({message:'Gagal mengambil detail pemilik', error: err.message});
    }
}

async function update(req,res) {
    try{
        const {id} = req.params;
        const pemilik = await Pemilik.findByPk(id);

        if(!pemilik){
            res.status(404).json({message: 'Pemilik tidak ditemukan'});
        };
        await Pemilik.update(req.body);
        res.json({message: 'Data pemilik berhasil diperbarui', data: pemilik})
    }catch(err){
        res.status(500).json({message:'Gagal memperbarui data pemilik', error: err.message})
    }
}

module.exports = {create,getAll,getById,update};