const Product = require('../models/products');

exports.getIndex = (_, res) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {
      products,
      docTitle: 'Products',
      hasProduct: products.length > 0,
      activeShop: true,
    });
  });
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    res.render('shop/product-detail', {
      product: product,
      docTitle: product.title,
      activeProducts: true,
    });
  });
};

exports.getProducts = (_, res) => {
  Product.fetchAll().then((products) => {
    res.render('shop/product-list', {
      products,
      docTitle: 'Products',
      hasProduct: products.length > 0,
      activeProducts: true,
    });
  });
};

exports.getCart = (req, res) => {
  req.user.getCart().then((products) => {
    res.render('shop/cart', {
      products,
      docTitle: 'Your Cart',
      activeCart: true,
      hasProduct: products.length > 0,
    });
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => req.user.addToCart(product))
    .then((res) => console.log(res))
    .then(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  req.user.deleteItemFromCart(productId).then(() => res.redirect('/cart'));
};

exports.getOrders = (req, res) => {
  req.user.getOrders().then((orders) => {
    res.render('shop/order', {
      orders,
      docTitle: 'Your Orders',
      activeOrders: true,
      hasOrder: orders.length > 0,
    });
  });
};

exports.postOrder = (req, res) => {
  req.user.addOrder().then(() => res.redirect('/orders'));
};
