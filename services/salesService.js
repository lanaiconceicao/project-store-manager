const salesModel = require('../models/salesModel');

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

module.exports = {
  add,
  getAll,
  getById,
};
