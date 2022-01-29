const salesModel = require('../models/salesModel');
const productService = require('./productService');

const add = async (sales) => {
  const result = salesModel.add(sales);
  return result;
};

const getAll = async () => {
  const result = salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

const update = async ({ product_id: id, quantity }) => {
  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

// Feito com ajuda do estudante Gessé Carlos
const remove = async (id) => {
  if (!id) return null;
  const [sale] = await getById(id);

  const product = await productService.getById(sale.product_id);
  product.quantity += sale.quantity;

  const removeSale = await salesModel.remove(id);

  await productService.update(product);

  return removeSale;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
