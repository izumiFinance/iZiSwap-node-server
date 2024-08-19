const express = require('express');
const cors = require('cors');
const app = express();
const { swap } = require('./iziswap/swap')

// CORS config
app.use(cors({
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Content-Encoding,Accept-Encoding'
}));

app.use(express.json());

app.get('/api/swap', async (req, res) => {
    const chainId = req.query.chainId;
    const amount = req.query.amount;
    const tokenFrom = req.query.tokenFrom;
    const tokenTo = req.query.tokenTo;
    const account = req.query.account;

    if ( !chainId || !amount || !tokenFrom || !tokenTo || !account) {
        return res.json({message: "Lacking parameters"});
    }

    try {
        const txData = await swap(tokenFrom, tokenTo, amount, Number(chainId), account)
        res.json(txData);
    } catch(e) {
        res.json({ message: e.message});
    }
    
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
