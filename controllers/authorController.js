const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

exports.getAll = async () => await prisma.author.findMany()

exports.create = async (data) => await prisma.author.create({data})

exports.update = async (id,name) => {
    await prisma.author.update({
        where:{id},
        data:{name}
    })
}

exports.delete = async (id) => {
    await prisma.author.delete({
        where:{id}
    })
}