require('dotenv').config();
// ======================================== IMPORTING ======================================

const express = require('express');
const bodyParser = require('body-parser');

// Importação de controllers
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const {
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateIfNameExists } = require('./controllers/middlewares/validateProductMiddleware');

const {
  validateProductIdMiddleware, validateSalesMiddleware, validateProdQuantityMiddleware,
} = require('./controllers/middlewares/validateSales');

const app = express();

app.use(bodyParser.json());

// =============================================================================================

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// ======================================== PRODUCTS ======================================

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

// ======================================== SALES ======================================

// Requisito 5

app.post('/sales',
  validateProductIdMiddleware,
  validateSalesMiddleware,
  validateProdQuantityMiddleware,
  salesController.add);

// Requisito 6
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

// Requisito 7
app.put('/sales/:id',
  validateProductIdMiddleware,
  validateSalesMiddleware,
  validateProdQuantityMiddleware,
  salesController.update);

// =============================================================================================

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
