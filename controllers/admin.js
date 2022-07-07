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
  const product = new Product(null, title, imageUrl, desc, price);
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  // const editMode = req.query.edit;
  const productId = req.params.productId;
  // if (!editMode) {
  //   res.redirect('/');
  // }
  Product.findById(productId, (product) => {
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
  const updatedProduct = new Product(productId, title, imageUrl, desc, price);
  updatedProduct.save();
  res.redirect('/admin/products');
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

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};
