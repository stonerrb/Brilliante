const express = require('express');

const { getGoldPrice } = require('../controllers/gold');

const router = express.Router();
router.use(express.json());

// -------------------- Main ---------------------------

router.get('/gold-price', getGoldPrice); // get the gold price

module.exports = router;