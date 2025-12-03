const express = require('express');
const {
  getProduct,
  createProducts,
  deleteProduct,
  putProduct,
} = require('../controllers/productControllers');
const productRouters = express.Router();

productRouters.get('/', getProduct);
productRouters.post('/', createProducts);
productRouters.delete('/:id', deleteProduct);
productRouters.put('/:id', putProduct);

module.exports = productRouters;
