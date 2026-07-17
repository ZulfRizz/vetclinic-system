const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');
const rekamMedisController = require('../controllers/rekamMedisController');

router.get('/pasien/:pasienId', verifyToken, authorizeRole(['owner', 'dokter', 'paramedis', 'resepsionis', 'kasir']), rekamMedisController.getByPasien);
router.post('/', verifyToken, authorizeRole(['dokter']), rekamMedisController.create);

module.exports = router;