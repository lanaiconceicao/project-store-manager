const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection
    .query(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
      [name, quantity],
    );
  
  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getAll = async () => {
  const [result] = await connection
    .query('SELECT * FROM StoreManager.products');
    return result;
};

const getById = async (id) => {
  const [result] = await connection
    .query('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (!result.length) return null;
  return result[0];
};

module.exports = {
  add,
  getAll,
  getById,
};
