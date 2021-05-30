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

async function getCocktailUnderPrice(preis) {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail WHERE preis <= $1', [preis]);
  if (rows.length > 0)
    return {
      code: 200,
      data: rows,
    };
  else
    return {
      code: 404,
      data: `Es wurde kein Cocktail mit dem Preis unter ${preis} in der Datenbank gefunden`,
    };
}

async function deleteCocktail(cname) {
  const { rows } = await db.query('SELECT * FROM cocktail WHERE cname = $1', [cname],);//Zuerst schauen ob es vorhanden ist
  if (rows.length > 0) {
    await db.query('DELETE FROM besteht WHERE cid = (SELECT cid FROM cocktail WHERE cname = $1)', [cname]);// Die Tabllen sind verbunden durch Joins daher muss schritweise vom Ursprung der table gelöscht
    await db.query('DELETE FROM bestellt WHERE cid = (SELECT cid FROM cocktail WHERE cname = $1)', [cname]);
    await db.query('DELETE FROM cocktail WHERE cname = $1', [cname]);
    return {
      code: 200,
      data: 'Deleted',
    };
  }
  return {
    code: 404,
    data: 'Not Found',
  };
}

module.exports = {
  getCocktailsAll,
  getCocktailZutaten,
  getCocktailUnderPrice,
  deleteCocktail
};
