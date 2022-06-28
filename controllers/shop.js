const Product = require('../models/products');

exports.getIndex = (_, res) => {
  Product.fetchAll((products) =>
    res.render('shop/index', {
      products,
      docTitle: 'Shop',
      hasProduct: products.length > 0,
      activeShop: true,
    })
  );
};

exports.getProducts = (_, res) => {
  Product.fetchAll((products) =>
    res.render('shop/product-list', {
      products,
      docTitle: 'Products',
      hasProduct: products.length > 0,
      activeProducts: true,
    })
  );
};

exports.getCart = (_, res) => {
  res.render('shop/cart', {
    docTitle: 'Your Cart',
    activeCart: true,
  });
};

exports.getOrder = (_, res) => {
  res.render('shop/order', {
    docTitle: 'Your Order',
    activeCart: true,
  });
};

exports.getCheckout = (_, res) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout',
    activeCheckout: true,
  });
};
