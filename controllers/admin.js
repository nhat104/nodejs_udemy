const Product = require('../models/products');

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, desc, price } = req.body;
  const product = new Product(title, imageUrl, desc, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) =>
    res.render('admin/products', {
      products,
      docTitle: 'Admin Products',
      hasProduct: products.length > 0,
      activeAdminProducts: true,
    })
  );
};
