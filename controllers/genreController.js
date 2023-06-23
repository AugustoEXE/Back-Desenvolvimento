const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async () => {
  return await prisma.genre.findMany();
};

exports.create = async (data) => {
  await prisma.genre.create({ data });
};

exports.delete = async (id) => {
  await prisma.genre.delete({
    where: {
      id: id,
    },
  });
};

exports.alter = async (id, data) => {
  await prisma.genre.update({
    where: { id },
    data: data,
  });
};
