const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const authorRouter = require("./routes/authors");
const publish_companyRouter = require("./routes/publish_company");
const genreRoutes = require("./routes/genre");
const bookRoutes = require("./routes/book");

app.use(bodyParser.json(0));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(genreRoutes);
app.use(authorRouter);
app.use(publish_companyRouter);
app.use(bookRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
