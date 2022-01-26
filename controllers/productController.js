const rescue = require('express-rescue');
const productService = require('../services/productService');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.add({ name, quantity });

  res.status(201).json(newProduct);
};

const getAll = rescue(async (_req, res) => {
  const product = await productService.getAll();
  res.status(200).json(product);
});

const getById = rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
});

module.exports = {
  add,
  getAll,
  getById,
};
