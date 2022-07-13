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
  req.user
    .createProduct({ title, imageUrl, desc, price })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  req.user.getProducts().then((results) => {
    const products = [];
    results.forEach((product) => {
      products.push(product.dataValues);
    });
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
  req.user.getProducts({ where: { id: productId } }).then(([{ dataValues: product }]) => {
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
  Product.findByPk(productId).then((product) => {
    product.update({ title, imageUrl, price, desc });
  });
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .catch((err) => console.log(err));
  res.redirect('/admin/products');
};
