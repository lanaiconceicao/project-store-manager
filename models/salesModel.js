const connection = require('./connection');

// Feito com a ajuda da pessoa estudante Gessé Carlos
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

const getAll = async () => {
  const [response] = await connection.query(
    `SELECT salesprod.sale_id AS saleId,
    sales.date AS date,
    salesprod.product_id AS product_id,
    salesprod.quantity AS quantity
    FROM sales_products AS salesprod
    INNER JOIN sales AS sales
    ON sales.id = salesprod.sale_id;
    `,
  );
  return response;
};

const getById = async (id) => {
  const [response] = await connection.query(
    `SELECT sales.date AS date,
    salesprod.product_id AS product_id,
    salesprod.quantity AS quantity
    FROM sales_products AS salesprod
    INNER JOIN sales AS sales
    ON sales.id = salesprod.sale_id
    WHERE salesprod.sale_id = ?
    `, [id],
  );

  if (!response.length) return null;

  return response;
};

module.exports = {
  add,
  getAll,
  getById,
};
