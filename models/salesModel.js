const connection = require('./connection');

// Função add() feita com a ajuda da pessoa estudante Gessé Carlos
const add = async (sales) => {
  const [response] = await connection.query(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  const salesProducts = sales.map(async ({ product_id: productId, quantity }) => {
    await connection.query(
      `INSERT INTO sales_products
        (sale_id, product_id, quantity)
        VALUES (?, ?, ?)
      `,
      [response.insertId, productId, quantity],
    );
  });
  await Promise.all(salesProducts);

  return response;
};

module.exports = {
  add,
};
