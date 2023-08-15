const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = require("express-fileupload");

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
// console.log("ta aqui");

exports.create = async ({ data }) => {
    const {
        cover,
        release_date,
        pages,
        author_id,
        genre_id,
        publish_company_id,
    } = data;
    const formatedData = !release_date ? undefined : new Date(release_date);
    const blobImage = Buffer.from(cover, "utf8");
    // console.clear();
    // console.log(blobImage);
    // return
    // console.log({
    //     data: {
    //         ...data,
    //         // cover: blobImage,
    //         release_date: formatedData,
    //         pages: +pages,
    //         author_id: +author_id   ,
    //         genre_id: +genre_id,
    //         publish_company_id: +publish_company_id,
    //     },
    // })
    await prisma.book.create({
        data: {
            ...data,
            cover: blobImage,
            // cover: null,
            release_date: formatedData,
            pages: +pages,
            author_id: +author_id,
            genre_id: +genre_id,
            publish_company_id: +publish_company_id,
        },
    });
    return 'ok';
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
