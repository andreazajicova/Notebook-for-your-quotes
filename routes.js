const express = require('express');
const router = express.Router();
const records = require('./records')

function asyncHandler(cb){
    return async (req, res, next)=>{
      try {
        await cb(req,res, next);
      } catch(err){
        next(err);
      }
    };
}

router.get('/', (req, res) => {
    res.json({greeting: "Hello world"});
  })
  
router.get('/quotes', asyncHandler( async (req, res) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
}))
  
router.get('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
    res.json(quote);
    } else {
    res.status(404).json({message: "Quote not found"});
    }
}))

router.get('/quotes/quote/random', asyncHandler( async (req, res, next) => {
    const randomQuote = await records.getRandomQuote();
    res.json(randomQuote);

}))

router.post('/quotes', asyncHandler( async (req, res) => {
    if (req.body.author && req.body.quote) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote);
    } else {
        res.status(400).json({message: 'Both quote and author required.'});
    }
}));

router.put('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;

        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Quote not found"});
    }
}))

router.delete('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    await records.deleteQuote(quote);
    res.status(204).end();
}))

module.exports = router;