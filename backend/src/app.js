const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test',(req,res) =>{
    res.json({message: 'BE + PostgreSQL OK!!'});
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