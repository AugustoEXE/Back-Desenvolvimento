const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
    return await prisma.book.findMany({
        where: {
            name: { contains: params.name, mode: "insensitive" },
            release_date: { equals: new Data(params.release_date) },
            language: params.language,
            author: {
                name: { constains: params.author, mode: "insensitive" },
            },
            genre: {
                name: { constains: params.genre, mode: "insensitive" },
            },
            publish_company: {
                name: {
                    constains: params.publish_company,
                    mode: "insensitive",
                },
            },
        },
    });
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
