const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProduct = asyncHandler(async (_, res) => {
  const products = await prisma.product.findMany();
  if (!products) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No categories found' });
  }
  res.status(StatusCodes.OK).json(products);
});

const createProducts = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  const newProduct = await prisma.product.create({
    data: { name },
  });
  res.status(StatusCodes.CREATED).json(newProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'this product id is not a found' });
  }
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: `product deleted ${deletedProduct}` });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'product not found' });
  }
});

const putProduct = asyncHandler(async (req, res) => {
  const { id, name, description, price, currency, quantity, categoryId } =
    req.body;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Product ID is required' });
  }

  const data = {};
  if (name) data.name = name;
  if (description) data.description = description;
  if (price) data.price = price;
  if (currency) data.currency = currency;
  if (quantity) data.quantity = quantity;
  if (categoryId) data.categoryId = categoryId;

  try {
    const updateProduct = await prisma.product.update({
      where: { id: id },
      data,
    });
    res.status(StatusCodes.OK).json(updateProduct);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Product not found', error: error.message });
  }
});

module.exports = { getProduct, createProducts, deleteProduct, putProduct };
