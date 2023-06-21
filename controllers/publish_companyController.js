const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

exports.getAll = async () => await prisma.publish_company.findMany()

exports.create = async (data) => await prisma.publish_company.create({data})

exports.update = async (id,name) => {
    await prisma.publish_company.update({
        where:{id},
        data:{name}
    })
}

exports.delete = async (id) => {
    await prisma.publish_company.delete({
        where:{id}
    })
}