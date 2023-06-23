const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

const authorRouter = require("./routes/authors");
const publish_companyRouter = require("./routes/publishCompany");
const genreRoutes = require("./routes/genre");
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/users");

app.use(bodyParser.json(0));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(genreRoutes);
app.use(authorRouter);
app.use(bookRoutes);
app.use(cookieParser(), userRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
