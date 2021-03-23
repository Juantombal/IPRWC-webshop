const db = require('../util/database');

module.exports = class Product {
    constructor(title, image, description, quantity) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.quantity = quantity;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

};
