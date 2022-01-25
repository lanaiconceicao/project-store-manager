require('dotenv').config();
// ======================================== IMPORTING ======================================

const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const validateProductMiddleware = require('./controllers/middlewares/validateProductMiddleware');

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
  validateProductMiddleware,
  productController.add,
);

// =============================================================================================

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
