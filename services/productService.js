const productModel = require('../models/productModel');

const add = async ({ name, quantity }) => productModel.add(name, quantity);

module.exports = {
  add,
};
