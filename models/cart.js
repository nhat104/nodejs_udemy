const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProduct = cart.products.findIndex((product) => product.id === id);
      if (existingProduct !== -1) {
        cart.products[existingProduct].quantity = cart.products[existingProduct].quantity + 1;
      } else {
        cart.products = [...cart.products, { id, quantity: 1 }];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((p) => p.id === id);
      if (product) {
        const quantity = product.quantity;
        updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
        updatedCart.totalPrice = +updatedCart.totalPrice - productPrice * quantity;
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      } else {
        return;
      }
    });
  }

  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }
}

module.exports = Cart;
