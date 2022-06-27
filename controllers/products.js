const Product = require('../models/products');

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/add-product',
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (_, res) => {
  Product.fetchAll((products) =>
    res.render('shop', {
      products,
      docTitle: 'Shop',
      path: '/',
      hasProduct: products.length > 0,
      activeShop: true,
    })
  );
};
