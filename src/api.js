const express = require('express');
const routerLogin = require('./routers/router.login');
const erroHandler = require('./middlewares/erroHandler');

const app = express();

app.use(express.json());

app.use('/login', routerLogin);

app.use(erroHandler);

module.exports = app;
