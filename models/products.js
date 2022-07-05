const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const Cart = require('./cart');
const p = path.join(rootDir, 'data', 'products.json');

const getProductFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

exports.writeDataToFile = (data) => {
  fs.writeFile(p, JSON.stringify(data), (err) => {
    console.log(err);
  });
};

class Product {
  constructor(id, title, imageUrl, desc, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existProductIdx = products.findIndex((product) => product.id === this.id);
        const updateProducts = [...products];
        updateProducts[existProductIdx] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductFromFile(callback);
  }

  static findById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updateProducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
}

module.exports = Product;
