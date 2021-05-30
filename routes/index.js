const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { getCocktailsAll, getCocktailZutaten, getCocktailUnderPrice, deleteCocktail, InsertCocktail,patchCocktail } = require('../model/cocktail');

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

router.get(
  '/cocktails/:preis',
  asyncHandler(async (req, res) => {
    const result = await getCocktailUnderPrice(req.params.preis);
    res.status(result.code).json(result);
  }),
);

router.delete(
  '/cocktails/:cname',
  asyncHandler(async (req, res) => {
    const result = await deleteCocktail(req.params.cname);
    res.status(result.code).json(result);
  }),
);

router.post(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const result = await InsertCocktail(req.body);
    res.status(result.code).json(result);
  }),
);

router.patch(
  '/cocktails/:cname',
  asyncHandler(async (req, res) => {
    const result = await patchCocktail(req.params.cname, req.body);
    res.status(result.code).json(result);
  }),
);
module.exports = router;
