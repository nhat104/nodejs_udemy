const Cart = require('../models/cart');
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

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.render('shop/product-detail', { product, docTitle: product.title, activeProducts: true });
  });
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProduct = [];
      products.forEach((product) => {
        const cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProduct.push({ ...product, quantity: cartProductData.quantity });
        }
      });
      res.render('shop/cart', {
        docTitle: 'Your Cart',
        activeCart: true,
        products: cartProduct,
        hasProduct: cartProduct.length,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/');
};

exports.postCartDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
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
