const productService = require('../services/productService');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.add({ name, quantity });

  res.status(201).json(newProduct);
};

module.exports = {
  add,
};
