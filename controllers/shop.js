const Cart = require('../models/cart');
const Product = require('../models/products');

exports.getIndex = (_, res) => {
  Product.findAll()
    .then((results) => {
      const products = [];
      results.forEach((product) => {
        products.push(product.dataValues);
      });
      res.render('shop/index', {
        products,
        docTitle: 'Shop',
        hasProduct: products.length > 0,
        activeShop: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product.dataValues,
        docTitle: product.title,
        activeProducts: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (_, res) => {
  Product.findAll().then((results) => {
    const products = [];
    results.forEach((product) => {
      products.push(product.dataValues);
    });
    res.render('shop/product-list', {
      products,
      docTitle: 'Products',
      hasProduct: products.length > 0,
      activeProducts: true,
    });
  });
};

exports.getCart = (req, res) => {
  req.user.getCart().then((cart) =>
    cart.getProducts().then((results) => {
      const products = [];
      results.forEach((product) => {
        products.push(product.dataValues);
      });
      res.render('shop/cart', {
        docTitle: 'Your Cart',
        activeCart: true,
        products: products,
        hasProduct: products.length,
      });
    })
  );
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        const oldQuantity = product.cartItem.dataValues.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => fetchCart.addProduct(product, { through: { quantity: newQuantity } }))
    .then(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => cart.getProducts({ where: { id: productId } }))
    .then((products) => products[0].cartItem.destroy())
    .then(() => res.redirect('/cart'));
};

exports.getOrders = (req, res) => {
  req.user.getOrders({ include: ['products'] }).then((results) => {
    const orders = [];
    results.forEach((order) => {
      orders.push(order.dataValues);
    });
    res.render('shop/order', {
      docTitle: 'Your Order',
      activeOrder: true,
      orders,
      hasOrder: orders.length,
    });
  });
};

exports.postOrder = (req, res) => {
  let fetchCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts();
    })
    .then((products) =>
      req.user.createOrder().then((order) =>
        order.addProducts(
          products.map((product) => {
            product.orderItem = { quantity: product.cartItem.dataValues.quantity };
            return product;
          })
        )
      )
    )
    .then(() => fetchCart.setProducts(null))
    .then(() => res.redirect('/order'));
};
