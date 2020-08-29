const express = require("express");

const app = express();
const port = "8000";

const indexRouter = require('./routes/index');
const girlsRouter = require('./routes/girls');
const galleryRouter = require('./routes/gallery');

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

app.use('/', indexRouter);
app.use('/girls', girlsRouter);
app.use('/gallery', galleryRouter);

app.listen(port, () => {
    console.log("Initus")
})