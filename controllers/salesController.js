const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const add = rescue(async (req, res) => {
  const insertSale = await salesService.add(req.body);

  return res.status(201).json({
    id: insertSale.insertId,
    itemsSold: req.body,
  });
});

module.exports = {
  add,
};