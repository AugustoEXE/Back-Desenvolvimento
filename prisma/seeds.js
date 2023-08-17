const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function createSeeder() {
    const user = await prisma.User.createMany({
        data: [
            {
                name: "Gabriel",
                email: "santini@gmail.com",
                password: "senha123",
                admin: true,
            },
            {
                name: "Inácio",
                email: "inacio@gmail.com",
                password: "senha123",
                admin: true,
            },
            {
                name: "Augusto",
                email: "augusto@gmail.com",
                password: "senha123",
                admin: true,
            },
        ],
    });

    const authors = await prisma.Author.createMany({
        data: [
            {
                name: "George Orwell",
            },
            {
                name: "Machado de Assis",
            },
            {
                name: "Augusto Curry",
            },
        ],
    });
    const findAuthors = await prisma.Author.findMany();

    const genres = await prisma.Genre.createMany({
        data: [
            { name: "Romance" },
            { name: "Ação e Aventura" },
            { name: "N sei" },
        ],
    });
    const findGenres = await prisma.Genre.findMany();
    const publishCompanies = await prisma.Publish_company.createMany({
        data: [
            { name: "Saraiva" },
            { name: "Tree" },
            { name: "BooksOnTheTable" },
        ],
    });
    const findPublishCompanies = await prisma.Publish_company.findMany();
    const books = await prisma.Book.createMany({
        data: [
            {
                name: "O colecionador de lágrimas",
                cover: "nomedoarquivo",
                pages: 323,
                language: "português",
                release_date: new Date("2023-07-28T15:20:45"),
                author_id: findAuthors[2].id,
                genre_id: findGenres[1].id,
                publish_company_id: findPublishCompanies[2].id,
            },
            {
                cover: "nomedoarquivo",
                name: "Quincas Borba",
                pages: 200,
                language: "português",
                author_id: findAuthors[1].id,
                genre_id: findGenres[0].id,
                publish_company_id: findPublishCompanies[0].id,
            },
            {
                cover: "nomedoarquivo",
                name: "A revolu;ão do bichos",
                pages: 180,
                language: "português",
                author_id: findAuthors[0].id,
                genre_id: findGenres[2].id,
                publish_company_id: findPublishCompanies[1].id,
            },
        ],
    });
    const findBooks = await prisma.Book.findMany();
}

createSeeder()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
