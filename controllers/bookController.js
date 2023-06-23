const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async () => {
  await prisma.book.findMany();
};

exports.create = async (data) => {
  await prisma.book.create({ data });
};

exports.delete = async (id) => {
  await prisma.book.delete({
    where: {
      id: id,
    },
  });
};

exports.alter = async (id, data) => {
  await prisma.book.update({
    where: { id },
    data: data,
  });
};
