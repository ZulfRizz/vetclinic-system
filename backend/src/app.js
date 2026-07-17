const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const {verifyToken, authorizeRole} = require('./middlewares/authMiddleware');
const pasienRoutes = require('./routes/pasienRoutes');
const rekamMedisRoutes = require('./routes/rekamMedisRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/pasien',pasienRoutes);
app.use('/api/rekam-medis',rekamMedisRoutes);
app.get('/api/test',(req,res) =>{
    res.json({message: 'BE + PostgreSQL OK!!'});
});
// Endpoint contoh: hanya owner yang boleh akses
app.get('/api/staf', verifyToken,authorizeRole(['owner']),(req,res) =>{
    res.json({message: `Halo ${req.user.nama}, kamu berhasil akses data staf sebagai ${req.user.role}`})
});

const PORT = process.env.PORT || 5000;

sequelize.sync({alter: true})
    .then(() => {
        console.log('DB OK!!');
        app.listen(PORT,() =>{
            console.log(`server jalan di localhost port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('koneksi DB gagal: ',err);
    })