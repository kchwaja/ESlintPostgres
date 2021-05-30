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

async function InsertCocktail(c) {
  const { rows } = await db.query('SELECT MAX(cid) AS max FROM cocktail'); //Ermittelt die maximale vorhandene Id in der Datenbank
  const cid = rows[0].max + 1; //Erhöht die maximale ID in der Datenbank um 1 und speichert es in cid ab
  await db.query(
    'INSERT INTO cocktail (cid, cname, preis, zubereitung, kid, zgid, sgid) VALUES($1, $2, $3, $4, $5, $6, $7)',
    [cid, c.cname, c.preis, c.zubereitung, c.kid, c.zgid, c.sgid],
  );
  return {
    code: 200,
    data: `Inserted ${cid}`,
  };
}

module.exports = {
  getCocktailsAll,
  getCocktailZutaten,
  getCocktailUnderPrice,
  deleteCocktail,
  InsertCocktail
};
