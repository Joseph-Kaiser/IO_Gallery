const express = require("express");

const app = express();
const port = "8000";

const indexRouter = require('./routes/index');
const albumRouter = require('./routes/albuns');
const authRouter = require('./routes/login')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
} 

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded());

var cookieSession = require('cookie-session');
const { localsName } = require("ejs");
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    keys: ['d4fsd62c0sd4f56sdf', '5959sadf51a2sc89xa'],
    maxAge: 24 * 60 * 60 * 1000 //24H
}))

app.use('/', indexRouter);
app.use('/albums', albumRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log("Initus")
})