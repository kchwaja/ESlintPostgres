const db = require('../db');

async function getCocktailsAll() {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getCocktailZutaten(cname) {
  const { rows } = await db.query(
    'SELECT zbez FROM cocktail JOIN besteht b ON cocktail.cid = b.cid JOIN zutat z ON b.zid = z.zid WHERE cname = $1',
    [cname],
  );
  if (rows.length > 0) {
    return {
      code: 200,
      data: rows,
    };
  }
  return {
    code: 404,
    data: `the specified cocktail with the Name ${cname} was not found in the database`,
  };
}

module.exports = {
  getCocktailsAll,
  getCocktailZutaten,
};
