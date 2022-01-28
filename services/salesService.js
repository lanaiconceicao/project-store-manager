const salesModel = require('../models/salesModel');

const add = async (sales) => {
  const result = salesModel.add(sales);
  return result;
};

module.exports = {
  add,
};
