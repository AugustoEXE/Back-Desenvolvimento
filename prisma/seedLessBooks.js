const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
async function createSeeder() {
    const pass = await bcrypt.hash("senha123", 12);

    const user = await prisma.User.createMany({
        data: [
            {
                name: "Gabriel",
                email: "santini@gmail.com",
                password: pass,
                admin: true,
            },
            {
                name: "Inácio",
                email: "inacio@gmail.com",
                password: pass,
                admin: true,
            },
            {
                name: "Augusto",
                email: "augusto@gmail.com",
                password: pass,
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
