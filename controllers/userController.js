const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../funcs/token.js");
const bcrypt = require("bcrypt");
const { log } = require("console");

const prisma = new PrismaClient();

exports.create = async (data) => {
    const alreadyCreatedUser = await prisma.User.findUnique({
        where: { email: data.email },
    });

    if (alreadyCreatedUser) {
        throw new Error("Esse email já está em uso");
    }

    const createdUser = await prisma.User.create({ data });

    const cookieValues = await generateToken(createdUser);

    return cookieValues;
};
exports.delete = async (id) => {
    await prisma.User.delete({ where: { id: id } });
};

exports.alter = async (data) => {
    await prisma.User.update({ where: { id: parseInt(data.id) }, data });
};

exports.getOne = async (param) => {
    try {
        const resp = await prisma.User.findUnique({ where: { id: param } });
        return resp;
    } catch (e) {
        return e.message;
    }
};

exports.list = async () => {
    try {
        const list = await prisma.User.findMany() 
        return list       
    } catch (error) {
        return error
    }
}

exports.login = async (data) => {
    const { email } = data
    const userExists = await prisma.User.findUnique({
        where: { email },
    });

    if (userExists.email === data.email) {
        const cookieValue = await generateToken(userExists);
        const validate = bcrypt.compare(data.password, userExists.password);
        if (validate) {
            return cookieValue;
        } else {
            throw new Error("Senha incorreta!");
        }
    } else {
        throw new Error("Usuário não registrado!");
    }
};
