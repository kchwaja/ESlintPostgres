const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const {
  getCocktailsAll,
  getCocktailZutaten
} = require('../model/cocktail');

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const result = await getCocktailsAll();
    res.status(result.code).json(result);
  }),
);

router.get(
    '/cocktails/:cname/zutaten',
    asyncHandler(async (req, res) => {
      const result = await getCocktailZutaten(req.params.cname);
      res.status(result.code).json(result);
    }),
  );
module.exports = router;
