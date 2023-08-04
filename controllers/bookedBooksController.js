const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

exports.create = async (data)=> {
    const formateDevolutionDate = () => {
        const convertedData = data.bookedDate.toString()
        return 
    }
prisma.bookedBooks.create({data})
}

exports.bookedUserBooks = async (id)=> prisma.bookedBooks.findMany({
    include: {
        book: true
    },
    where: {
        user_id: id,
        active: true
    }
})

exports.historicBookedBooks = async (id)=> prisma.bookedBooks.findMany({
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
