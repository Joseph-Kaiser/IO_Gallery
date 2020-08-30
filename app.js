const express = require("express");

const app = express();
const port = "8000";

const indexRouter = require('./routes/index');
const albumRouter = require('./routes/albuns');

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/albums', albumRouter);

app.listen(port, () => {
    console.log("Initus")
})