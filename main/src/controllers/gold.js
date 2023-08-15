const goldPriceGenerate = require('../utils');

const getGoldPrice = async (req,res) => {
    try{
        const price = goldPriceGenerate();

        res.send({ gold_price: price});
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error'})
    }
};

module.exports = {getGoldPrice};