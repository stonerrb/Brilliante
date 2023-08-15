const axios = require('axios');

const GoldItem = require('../models/golditem');
const {filterPricesByTimeRange, calculateBestPrice} = require('../utils');

const addGoldItem = async(req,res) => {
    try {
        const { name, grams } = req.body;
        const response = await axios.get('http://localhost:3000/gold-price');
        const currentGoldPrice = response.data.gold_price;

        const goldItem = new GoldItem({
            name,
            grams,
            currentPrice: currentGoldPrice * grams,
            priceHistory: [{ price: currentGoldPrice * grams }],
        });

        await goldItem.save();

        res.json(goldItem);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateGoldItemPrice = async(req,res) => {
    try {
        const itemId = req.params.itemId;
        const goldItem = await GoldItem.findById(itemId);

        if(!goldItem) return res.status(404).json({ error: 'Item not found' });

        const response = await axios.get('http://localhost:3000/gold-price'); 
        const currentGoldPrice = response.data.gold_price; 

        goldItem.currentPrice = currentGoldPrice * goldItem.grams;

        goldItem.priceHistory.push({ price: goldItem.currentPrice });

        await goldItem.save();

        res.json(goldItem);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getCurrBestPrice = async(req,res) => {
    try {
        const itemId = req.query.itemId;
        const timeRange = parseInt(req.query.timeRange) || 30;
    
        const query = itemId ? { _id: itemId } : {};
    
        const goldItems = await GoldItem.find(query);
    
        const response = goldItems.map((item) => {
          const pricesWithinTimeRange = filterPricesByTimeRange(item.priceHistory, timeRange);
    
          const bestPrice = calculateBestPrice(pricesWithinTimeRange);
    
          return {
            currentPrice: item.currentPrice,
            bestPriceWithinTimeRange: bestPrice || null,
          };
        });
    
        res.json(response);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { addGoldItem , updateGoldItemPrice, getCurrBestPrice};