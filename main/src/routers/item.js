const express = require('express');

const { addGoldItem, updateGoldItemPrice , getCurrBestPrice} = require('../controllers/item')

const router = express.Router();
router.use(express.json());

// -------------------- Main ---------------------------

router.post('/gold-item', addGoldItem);  // add gold item

router.put('/update-price/:itemId',updateGoldItemPrice);  // update the gold item price

router.get('/gold-prices', getCurrBestPrice);  // get current and best price
  
module.exports = router;