const Cart = require('../models/cart');
const Product = require('../models/products');

exports.getIndex = (_, res) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/index', {
        products: rows,
        docTitle: 'Shop',
        hasProduct: rows.length > 0,
        activeShop: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(([[product]]) => {
      res.render('shop/product-detail', { product, docTitle: product.title, activeProducts: true });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (_, res) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/product-list', {
        products: rows,
        docTitle: 'Products',
        hasProduct: rows.length > 0,
        activeProducts: true,
      });
    })
    .catch((err) => console.log(err));
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
