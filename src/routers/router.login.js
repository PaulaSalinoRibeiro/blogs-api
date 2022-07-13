const { Router } = require('express');
const loginController = require('../controllers/loginController');

const routerLogin = Router();

routerLogin.post('/', loginController.login);

module.exports = routerLogin;