const productModel = require('../models/productModel');

const add = async ({ name, quantity }) => productModel.add(name, quantity);

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

module.exports = {
  add,
  getAll,
  getById,
};
