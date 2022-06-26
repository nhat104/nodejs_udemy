const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (_, res) => {
  const products = adminData.products;
  res.render('shop', {
    products,
    docTitle: 'Shop',
    path: '/',
    hasProduct: products.length > 0,
    activeShop: true,
  });
});

module.exports = router;
