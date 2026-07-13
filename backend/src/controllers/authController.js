const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

// REGISTER
async function register(req,res) {
    try{
        // ambil field dari body request
        const {nama, email,password,role} = req.body;
        // cek email sudah dipakai atau belum
        const existingUser = await User.findOne({where: {email}});
        if(existingUser){
            return res.status(400).json({message: 'email sudah terdaftar'});
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            nama,
            email,
            password: hashedPassword,
            role,
        });
        res.status(201).json({
            message: 'Registrasi Berhasil',
            user: {id: newUser.id, nama: newUser.nama, email: newUser.email, role: newUser.role},
        });
    }catch (err){
        res.status(500).json({message: 'Terjadi kesalahan server',error: err.message})
    };
};

// LOGIN NJIR
async function login(req,res) {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user){
            return res.status(401).json({message: 'Email atau password salah'});
        }
        // validasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Email atau password salah'});
        }

        if(!user.status_aktif){
            return res.status(403).json({message: 'Akun kamu tidak aktif'})
        }

        // generate JWT
        const token = jwt.sign(
            {id: user.id, nama: user.nama, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '8h'}
        );

        res.json({
            message: 'Login berhasil',
            token,
            user: { id: user.id, nama: user.nama, email: user.email, role: user.role },
        });
    }catch(err){
        res.status(500).json({message: 'Terjadi kesalahan server', error: err.message});
    }
}

module.export = {register, login};