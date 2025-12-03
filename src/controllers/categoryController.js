const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const category = asyncHandler(async (_, res) => {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'No categories found' });
  }
  res.status(StatusCodes.OK).json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST);
  }
  const newCategory = await prisma.category.create({
    data: { name },
  });
  res.status(StatusCodes.CREATED).json(newCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'this category id is not a found' });
  }
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: id },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: `category deleted ${deletedCategory}` });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'category not found' });
  }
});

module.exports = { category, createCategory, deleteCategory };
