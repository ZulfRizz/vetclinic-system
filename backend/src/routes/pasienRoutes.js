const express = require('express');
const router = express.Router();
const {verifyToken, authorizeRole} = require('../middlewares/authMiddleware');
const pasienController = require('../controllers/pasienController');

// Mengacu ke matriks RBAC: owner, dokter (read+update), paramedis (read), resepsionis (CRUD)
router.get('/', verifyToken, authorizeRole(['owner', 'dokter', 'paramedis', 'resepsionis', 'kasir']), pasienController.getAll);
router.get('/:id', verifyToken, authorizeRole(['owner', 'dokter', 'paramedis', 'resepsionis', 'kasir']), pasienController.getById);
router.post('/', verifyToken, authorizeRole(['owner', 'resepsionis']), pasienController.create);
router.put('/:id', verifyToken, authorizeRole(['owner', 'dokter', 'resepsionis']), pasienController.update);

module.exports = router;