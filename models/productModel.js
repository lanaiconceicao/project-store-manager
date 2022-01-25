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

module.exports = {
  add,
};
