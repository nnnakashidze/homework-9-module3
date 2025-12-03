const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });
  const clothing = await prisma.category.create({ data: { name: 'Clothing' } });

  await prisma.product.create({
    data: {
      name: 'Smartphone',
      description: 'Latest model smartphone',
      price: 999,
      currency: 'USD',
      quantity: 50,
      categoryId: electronics.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'T-Shirt',
      description: 'Cotton t-shirt',
      price: 25,
      currency: 'USD',
      quantity: 200,
      categoryId: clothing.id,
    },
  });
}

seed().then(() => prisma.$disconnect());
