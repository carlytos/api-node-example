'use strinct';

const express = require('express');
const productoController = require('../controllers/product');
const userController = require('../controllers/user')
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/product', productoController.getProducts);
api.get('/product/:id', productoController.getProduct);
api.post('/product', productoController.saveProduct);
api.put('/product/:id', productoController.updateProduct);
api.delete('/product/:id', productoController.deleteProduct);

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' });
});

api.post('/signUp', userController.signUp);
api.post('/signIn', userController.signIn);

module.exports = api;
