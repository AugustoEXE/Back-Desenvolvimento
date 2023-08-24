const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.create = async (data) => {
    const { book_id, bookedDate, user_id, available, active } = data;

    const rigthBookedDate = new Date(bookedDate);
    const newDate = new Date();
    const formateDevolutionDate = () => {
        const daysAdded = new Date(rigthBookedDate); // Criando um novo objeto Date com a data atualizada
        daysAdded.setDate(rigthBookedDate.getDate() + 8);
        return daysAdded.toISOString();
    };

    const bookedBookExists = await prisma.bookedBooks.findUnique({
        where: {
            user_id,
            book_id,
        },
    });
    if (bookedBookExists) {
        await prisma.bookedBooks.update({
            data: { active: active },
            where: { user_id, book_id },
        });
    } else {
        await prisma.bookedBooks.create({
            data: {
                book_id: Number(book_id),
                bookedDate: formateDevolutionDate(),
                user_id: Number(user_id),
            },
        });
    }
    await prisma.book.update({
        data: { available: available },
        where: { user_id },
    });
};

exports.bookedUserBooks = async (id) =>
    await prisma.bookedBooks.findMany({
        include: {
            book: {
                include: {
                    author: true,
                    genre: true,
                    publish_company: true,
                },
            },
        },
        where: {
            user_id: id,
            active: true,
        },
    });

exports.historicBookedBooks = async (id) =>
    await prisma.bookedBooks.findMany({
        include: {
            book: true,
            user: true,
        },
        where: {
            user_id: id,
        },
    });

exports.changeBookedStatus = async (data, id) =>
    await prisma.bookedBooks.update({
        data: { active: data },
        where: { user_id: id },
    });

// exports.create = async (data) => prisma.bookedBooks.create({});
