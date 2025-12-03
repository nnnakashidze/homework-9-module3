const express = require('express');
const { PrismaClient } = require('@prisma/client');
const categoryRouters = require('./routes/categoryRouters');
const productRouters = require('./routes/productRouters');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/api/category', categoryRouters);
app.use('/api/products', productRouters);

app.listen(4000, () => {
  console.log('http://localhost:4000');
});
