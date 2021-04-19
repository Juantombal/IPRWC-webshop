const db = require('../util/database');

module.exports = class Product {
    constructor(title, image, description, price, quantity) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static getProductById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    static save(product) {
        return db.execute(
            'INSERT INTO products (title, image, description, price, quantity) VALUES (?, ?, ?, ?, ?)',
            [product.title, product.image, product.description, product.price, product.quantity]
        );
    }

    static update(product, id) {
        return db.execute(
            'UPDATE products SET title = ?, image = ?, description = ?, price = ?, quantity = ? WHERE id = ?',
            [product.title, product.image, product.description, product. price, product.quantity, id],
        );
    }

    static find(image) {
        return db.execute('SELECT * FROM products WHERE image = ?', [image]);
    }

    static delete(id) {
        return db.execute('DELETE FROM products WHERE id = ?', [id]);
    }
};
