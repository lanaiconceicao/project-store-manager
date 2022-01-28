const productModel = require('../models/productModel');

const add = async ({ name, quantity }) => productModel.add(name, quantity);

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const update = async ({ id, name, quantity }) => {
  await getById(id);
  const updatedProduct = await productModel.update(id, name, quantity);
  return updatedProduct;
};

const remove = async (id) => productModel.remove(id);

// Feito com a ajuda do estudante Gessé Carlos
const checkProductQuantity = async (id) => {
  const product = await getById(id);

  return product.quantity;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
  checkProductQuantity,
};
