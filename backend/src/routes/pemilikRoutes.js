const express = require("express");
const router = express.Router();
const {verifyToken,authorizeRole}  = require('../middlewares/authMiddleware');
const pemilikController = require('../controllers/pemilikController');

router.get('/',verifyToken,authorizeRole(['owner','dokter','paramedis','resepsionis','kasir']),pemilikController.getAll);
router.get('/:id',verifyToken,authorizeRole(['owner','dokter','paramedis','resepsionis','kasir']),pemilikController.getById);
router.post('/',verifyToken,authorizeRole(['owner','resepsionis']),pemilikController.create);
router.post('/:id',verifyToken,authorizeRole(['owner','resepsionis']),pemilikController.update);

module.exports = router;