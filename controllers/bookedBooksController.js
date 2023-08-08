const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

exports.create = async (data)=> {
    
 
    const { book_id, bookedDate, user_id} = data
    const formateDevolutionDate = () => {
        const daysAdded = bookedDate.getDate() + 7;
        return  daysAdded.toISOString()
    }
await prisma.bookedBooks.create({data: {
    book_id, bookedDate: formateDevolutionDate(), user_id
}})
}

exports.bookedUserBooks = async (id)=> await prisma.bookedBooks.findMany({
    include: {
        book: true
    },
    where: {
        user_id: id,
        active: true
    }
})

exports.historicBookedBooks = async (id)=> await prisma.bookedBooks.findMany({
    include: {
        book: true,
        user: true
    },
    where: {
        user_id: id,
    }
})

exports.create = async (data, id)=> prisma.bookedBooks.update({data: {active: data}, where: {user_id: id}})

exports.create = async (data)=> prisma.bookedBooks.create({})
