const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection
    .query(
      'INSERT INTO products (name, quantity) VALUES (?, ?);',
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
    .query('SELECT * FROM products');
    return result;
};

const getById = async (id) => {
  const [result] = await connection
    .query('SELECT * FROM products WHERE id = ?', [id]);
  if (!result.length) return null;
  return result[0];
};

const update = async (id, name, quantity) => {
  await connection
    .query('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [
      name,
      quantity,
      id,
    ]);
  return { id, name, quantity };
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
