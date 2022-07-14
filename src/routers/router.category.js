const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authToken = require('../middlewares/authToken');

const routerCategory = Router();

routerCategory.use(authToken);

routerCategory.post('/', categoryController.create);

routerCategory.get('/', categoryController.listAll);

module.exports = routerCategory;