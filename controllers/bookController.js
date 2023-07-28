const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
    const releaseDate = !params.release_date
        ? undefined
        : new Date(params.release_date)

    return await prisma.book.findMany({
        where: {
            name: { contains: params.name, },
            release_date: {
                lte: releaseDate
            },
            language: params.language,
            author: {
                name: { constains: params.author },
            },
            genre: {
                name: { constains: params.genre, },
            },
            publish_company: {
                name: {
                    constains: params.publish_company,

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
