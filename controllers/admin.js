const Product = require('../models/products');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, desc, price } = req.body;
  const product = new Product(title, imageUrl, price, desc, req.user._id);
  product.save().then(() => res.redirect('/admin/products'));
};

exports.getProducts = (_, res) => {
  Product.fetchAll().then((products) => {
    res.render('admin/products', {
      products,
      docTitle: 'Admin Products',
      hasProduct: products.length > 0,
      activeAdminProducts: true,
    });
  });
};

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      product,
      docTitle: 'Edit Product',
      path: '/admin/edit-product',
      activeEditProduct: true,
      editing: true,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, desc } = req.body;
  const product = new Product(title, imageUrl, price, desc, productId, req.user._id);
  product.save().then(() => res.redirect('/admin/products'));
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.deleteById(productId).then(() => res.redirect('/admin/products'));
};
