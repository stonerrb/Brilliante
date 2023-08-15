const axios = require('axios');
const GoldItem = require('./models/golditem');


// For Gold Price
const goldPriceGenerate = () => {
  const minPrice = 100;
  const maxPrice = 1000;

  try {
      const randomPrice = parseFloat((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));
      return randomPrice;
  } catch (error) {
      throw error;
  }
};

// For Gold Items
const filterPricesByTimeRange = (priceHistory, timeRange) => {  // utility function to filter price history by time range if provided
    const now = Date.now();
    return priceHistory.filter(
      (priceEntry) => new Date(priceEntry.timestamp) >= new Date(now - timeRange * 24 * 60 * 60 * 1000)
    );
  };

const calculateBestPrice = (priceEntries) => {
  if (priceEntries.length === 0) {
    return null;
  }

  return priceEntries.reduce((minPrice, priceEntry) => {
    return priceEntry.price < minPrice ? priceEntry.price : minPrice;
  }, Infinity);
};

// Script Util function
const updateGoldPrice = async () => {
    try{
        const response = await axios.get('https://localhost:3000/gold-price');

        const currentGoldPrice = response.data.gold_price;

        const goldItems = await GoldItem.find();

        for(const item of goldItems){
            item.currentPrice = currentGoldPrice * goldItems.grams;
            item.priceHistory.push({ price: currentGoldPrice * goldItems.grams});
            await item.save();
        }

        console.log('Script ran succesfully');
    }
    catch(error){
        console.log('Error Occured running the Script');
    }
};

module.exports = {goldPriceGenerate, filterPricesByTimeRange, calculateBestPrice, updateGoldPrice};