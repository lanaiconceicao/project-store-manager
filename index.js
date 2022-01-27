require('dotenv').config();
// ======================================== IMPORTING ======================================

const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const {
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateIfNameExists,
  // validateIfProductAlreadyExists,
} = require('./controllers/middlewares/validateProductMiddleware');

const app = express();

app.use(bodyParser.json());

// =============================================================================================

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ======================================== DEVELOPMENT ======================================

// Requisito 1
app.post(
  '/products',
  validateNameMiddleware,
  validateIfNameExists,
  validateQuantityMiddleware,
  productController.add,
);

// Requisito 2
app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

// Requisito 3
app.put(
  '/products/:id',
  validateNameMiddleware,
  validateQuantityMiddleware,
  // validateIfProductAlreadyExists,
  productController.update,
);

// Requisito 4
app.delete('/products/:id', productController.remove);

// =============================================================================================

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
