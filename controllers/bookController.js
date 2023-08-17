const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const Jimp = require("jimp");

exports.list = async (params) => {
    const releaseDate = !params.release_date
        ? undefined
        : new Date(params.release_date);

    const query = await prisma.book.findMany({
        include: {
            author: true,
            publish_company: true,
            genre: true,
        },
        where: {
            id: params.id == null ? { gt: 0 } : { equals: +params.id },
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

    return query;
};

// exports.list = async () => {
//     return await prisma.book.findMany();
// };
// console.log("ta aqui");

exports.create = async ({ body, files }) => {
    const { release_date, pages, author_id, genre_id, publish_company_id } =
        body;

    console.log(body);
    const formatedData = !release_date ? undefined : new Date(release_date);
    const filePath = process.env.UPLOAD_FILE + files.filename;
    // return
    console.log(files);
    //const blobImage = Buffer.from(cover, "utf8");
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
            ...body,
            cover: filePath,
            release_date: formatedData,
            pages: +pages,
            author_id: +author_id,
            genre_id: +genre_id,
            publish_company_id: +publish_company_id,
        },
    });
    return "ok";
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
