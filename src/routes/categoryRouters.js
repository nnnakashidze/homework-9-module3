const {
  category,
  createCategory,
  deleteCategory,
} = require('../controllers/categoryController.js');

const express = require('express');
const categoryRouters = express.Router();

categoryRouters.get('/', category);
categoryRouters.post('/', createCategory);
categoryRouters.delete('/:id', deleteCategory);

module.exports = categoryRouters;
