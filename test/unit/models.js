const connection = require('./controllers');

const add = async (name, quantity) => {
  const [result] = await connection
    .query('INSERT INTO products (name, quantity) VALUES (?, ?);',
      [name, quantity]);
  
  return {
    id: result.insertId,
    name,
    quantity
  };
}

module.exports = {
  add,
}