const rescue = require('express-rescue');
const productService = require('../services/productService');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.add({ name, quantity });

  return res.status(201).json(newProduct);
};

const getAll = rescue(async (_req, res) => {
  const product = await productService.getAll();
  return res.status(200).json(product);
});

const getById = rescue(async (req, res) => {
  const product = await productService.getById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

  const newProduct = await productService.update({ id, name, quantity });

  return res.status(200).json(newProduct);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
  
  await productService.remove(id);
  res.status(200).json(product);
});

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
