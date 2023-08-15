const express = require('express');

const { addGoldItem, updateGoldItemPrice , getCurrBestPrice} = require('../controllers/item')

const router = express.Router();
router.use(express.json());

// -------------------- Main ---------------------------

router.post('/gold-item', addGoldItem);

router.put('/update-price/:itemId',updateGoldItemPrice);

router.get('/gold-prices', getCurrBestPrice);
  
module.exports = router;