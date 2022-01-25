const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().positive().min(1).required(),
});

const validateProductSchema = (body) => {
  const { error } = productSchema.validate(body);

  if (error) {
    throw error;
  }
};

const validateProductMiddleware = (req, res, next) => {
  validateProductSchema(req.body);

  const { name, quantity } = req.body;

  // NAME VALIDATION
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (!validateProductSchema) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  // if (name === name.body) {
  //   return res.status(409).json({ message: 'Product already exists' });
  // }

  // QUANTITY VALIDATION
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!validateProductSchema) {
    return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }
  
  next();
};

module.exports = validateProductMiddleware;
