const db = require('../utils/database');

class Product {
  constructor(id, title, imageUrl, desc, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.desc = desc;
    this.price = price;
  }

  save() {
    return db.execute('insert into products (title, imageUrl, `desc`, price) values (?, ?, ?, ?)', [
      this.title,
      this.imageUrl,
      this.desc,
      this.price,
    ]);
  }

  static fetchAll() {
    return db.execute('select * from products');
  }

  static findById(id) {
    return db.execute(`select * from products where id = ${id}`);
  }

  static deleteById(id) {}
}

module.exports = Product;
