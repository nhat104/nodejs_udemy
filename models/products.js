const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class Product {
  constructor(title, imageUrl, price, desc, userId, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.desc = desc;
    this.userId = userId;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    if (this._id) {
      // Update 1 product
      return getDb().collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      // Create new product
      return getDb().collection('products').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      });
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(productId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new ObjectId(productId) });
  }
}

module.exports = Product;
