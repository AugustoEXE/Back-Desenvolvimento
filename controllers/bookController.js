const { PrismaClient } = require("@prisma/client");
const { log } = require("console");
const prisma = new PrismaClient();

exports.list = async (params) => {
    return await prisma.book.findMany({
        include: {
            author: true,
            publish_company: true,
            genre: true,
        },
        where: {
            name: params.name != null ? { contains: params.name } : undefined,

            release_date: params.release_date
                ? { equals: params.release_date }
                : undefined,

            language: params.language,

            author:
                params.author != null
                    ? {
                          name: {
                              contains: params.author,
                          },
                      }
                    : undefined,

            genre: params.genre
                ? {
                      name: { contains: params.genre },
                  }
                : undefined,

            publish_company: params.publish_company
                ? {
                      name: {
                          contains: params.publish_company,
                      },
                  }
                : undefined,
        },
    });
};

// exports.list = async () => {
//     return await prisma.book.findMany();
// };

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
