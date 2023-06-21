const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const port = 3000;
const prisma = new PrismaClient();
const bodyParser = require('body-parser')
const authorRouter = require('./routes/authors')
const publish_companyRouter = require('./routes/publish_company')


app.use(bodyParser.json(0))
app.use(bodyParser.urlencoded({extended: false}))

async function main() {
  const allUsers = await prisma.User.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

  app.use(authorRouter)
  app.use(publish_companyRouter)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
