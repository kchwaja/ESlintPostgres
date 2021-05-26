const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const {
  getCocktailsAll,
} = require('../model/cocktail');

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const result = await getCocktailsAll();
    res.status(result.code).json(result);
  }),
);

module.exports = router;
