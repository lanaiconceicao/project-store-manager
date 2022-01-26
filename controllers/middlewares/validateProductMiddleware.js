const validateNameMiddleware = (req, res, next) => {
  const { name } = req.body;

  // NAME VALIDATION
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  // if (name === name.body) {
  //   return res.status(409).json({ message: 'Product already exists' });
  // }
  
  next();
};

const validateQuantityMiddleware = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  validateNameMiddleware,
  validateQuantityMiddleware,
};
