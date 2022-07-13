const { Router } = require('express');
const userController = require('../controllers/userController');

const routerUser = Router();

routerUser.post('/', userController.createUser);

module.exports = routerUser;