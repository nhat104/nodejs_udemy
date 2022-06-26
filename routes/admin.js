const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product'));
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/add-product',
    activeAddProduct: true,
  });
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = { router, products };
