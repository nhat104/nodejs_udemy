const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    return getDb().collection('users').insertOne(this);
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => ({
          ...p,
          quantity: this.cart.items.find((i) => i.productId.toString() === p._id.toString())
            .quantity,
        }));
      });
  }

  addToCart(product) {
    const cartProductIdx = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );

    let quantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIdx >= 0) {
      quantity = this.cart.items[cartProductIdx].quantity + 1;
      updatedCartItems[cartProductIdx].quantity = quantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity,
      });
    }

    const updatedCart = { items: updatedCartItems };
    return getDb()
      .collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    return getDb()
      .collection('users')
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  addOrder() {
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return getDb().collection('orders').insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return getDb()
          .collection('users')
          .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: [] } } });
      });
    // const order = {
    //   items: this.cart.items,
    //   user: {
    //     _id: new ObjectId(this._id),
    //     name: this.name,
    //   },
    // }
    // return getDb()
    //   .collection('orders')
    //   .insertOne(order)
  }

  static findById(userId) {
    return getDb()
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
