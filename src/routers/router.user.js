const { Router } = require('express');
const userController = require('../controllers/userController');
const authToken = require('../middlewares/authToken');

const routerUser = Router();

routerUser.post('/', userController.createUser);

routerUser.use(authToken);

routerUser.get('/', userController.listAll);

module.exports = routerUser;