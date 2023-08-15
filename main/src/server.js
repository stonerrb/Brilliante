// importing dependencies
const express = require('express');
const cron = require('node-cron');
require('./db/mongoose');

// importing routers
const goldPriceRouter = require('./routers/gold');
const goldItemRouter = require('./routers/item')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(goldPriceRouter);
app.use(goldItemRouter);

//global error handler
app.use((req, res) => {
    if (req.err) {
        res.status(500).send({ error: req.err })
    }
    else {
        res.status(404).send({ error: "Nothing Found" })
    }
})

cron.schedule('0 0 * * *',() => {
    updateGoldPrice();
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

module.exports = {app}