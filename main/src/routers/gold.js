const express = require('express');

const { getGoldPrice } = require('../controllers/gold');

const router = express.Router();
router.use(express.json());

// -------------------- Main ---------------------------

router.get('/gold-price', getGoldPrice);

module.exports = router;