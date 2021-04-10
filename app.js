//---------------Definitions---------------\\

const Express = require('express');

const app = Express();

const path = require('path');

const { green } = require('chalk');

const http = require('http');

const server = http.Server(app);

const PORT = process.env.PORT || 5000;

const { Database } = require("wio.db");
const db = new Database("database/users.json");

//---------------Definitions---------------\\

//---------------Pages---------------\\

const homePage = path.join('pages', 'home.ejs');

const registerPage = path.join('pages', 'register.ejs');

//---------------Pages---------------\\


app.set("view engine", "ejs");
app.use(Express.static(__dirname + '/public'));



app.get('/', async function (req, res) {
    const user = await db.fetch(req.ip);
    res.render(homePage, {
        User: user
    });
});

app.get('/register', async function (req, res) {
    const user = await db.fetch(req.ip);
    res.render(registerPage, {
        message: ('loginMessage'),
        User: user
    });
});

server.listen(PORT, function () {
    console.log(green("Your app is listening on port " + PORT));
});