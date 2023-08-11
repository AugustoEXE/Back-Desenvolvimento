const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.list = async (params) => {
    const releaseDate = !params.release_date
        ? undefined
        : new Date(params.release_date);

    return await prisma.book.findMany({
        include: {
            author: true,
            publish_company: true,
            genre: true,
        },
        where: {
            name: { contains: params.name },
            release_date: {
                lte: releaseDate,
            },
            language: params.language,
            author: {
                name: { constains: params.author },
            },
            genre: {
                name: { constains: params.genre },
            },
            publish_company: {
                name: {
                    constains: params.publish_company,
                },
            },
        },
    });
};

// exports.list = async () => {
//     return await prisma.book.findMany();
// };

console.log('ta aqui')
exports.create = async (data) => {
    const { release_date, pages, author_id, genre_id, publish_company_id } =
        data.data;
    const formatedData = release_date ? undefined : new Date(release_date);
    return await prisma.book.create({
        data: {
            ...data.data,
            release_date: formatedData,
            pages: Number(pages),
            author_id: Number(author_id),
            genre_id: Number(genre_id),
            publish_company_id: Number(publish_company_id),
        },
    });
};

exports.bookBooks = async (id, data) => {
    await prisma.book.update({
        data: { available: data },
        where: { id: Number(id) },
    });
};
exports.delete = async (id) => {
    await prisma.book.delete({
        where: {
            id: Number(id),
        },
    });
};

exports.alter = async (id, data) => {
    const { author_id, genre_id, publish_company } = data;

    await prisma.book.update({
        where: { id: Number(id) },
        data: {
            ...data,
            release_date: rightDate,
            pages: Number(pages),
            author_id: Number(author_id),
            genre_id: Number(genre_id),
            publish_company_id: Number(publish_company),
        },
    });
};
