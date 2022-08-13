const Order = require('../models/order');
const Product = require('../models/product');

exports.getIndex = (req, res) => {
  Product.find()
    .lean()
    .then((products) => {
      res.render('shop/index', {
        products,
        docTitle: 'Shop',
        hasProduct: products.length > 0,
        activeShop: true,
        csrfToken: req.csrfToken(),
      });
    });
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .lean()
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        docTitle: product.title,
        activeProducts: true,
      });
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .lean()
    .then((products) => {
      res.render('shop/product-list', {
        products,
        docTitle: 'Products',
        hasProduct: products.length > 0,
        activeProducts: true,
      });
    });
};

exports.getCart = (req, res) => {
  req.user.populate('cart.items.productId').then((user) => {
    const products = user.cart.items.map((item) => ({
      ...item.productId._doc,
      quantity: item.quantity,
      productId: item.productId._id,
    }));

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
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  req.user.removeItemFromCart(productId).then(() => res.redirect('/cart'));
};

exports.getOrders = (req, res) => {
  Order.find({ 'user.userId': req.user._id })
    .populate('products.productId')
    .lean()
    .then((results) => {
      const orders = results.map((order) => {
        const newOrder = order.products.map((product) => ({
          ...product.productId,
          quantity: product.quantity,
        }));
        return {
          _id: order._id,
          products: newOrder,
        };
      });
      res.render('shop/order', {
        orders,
        docTitle: 'Your Orders',
        activeOrder: true,
        hasOrder: orders.length > 0,
      });
    });
};

exports.postOrder = (req, res) => {
  req.user
    .populate('cart')
    .then((user) => {
      const products = user.cart.items.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      }));
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user._id,
        },
        products,
      });
      order.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/order'));
};
