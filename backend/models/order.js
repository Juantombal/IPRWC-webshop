const db = require('../util/database');

module.exports = class Order {
    constructor(title, image, price, user, quantity) {
        this.title = title;
        this.image = image;
        this.price = price;
        this.user = user;
        this.quantity = quantity;
    }

    static fetchAll(id) {
        return db.execute('SELECT * FROM orders WHERE user = ?', [id]);
    }

    static save(order) {
        return db.execute(
            'INSERT INTO orders (title, image, price, user, quantity) VALUES (?, ?, ?, ?, ?)',
            [order.title, order.image, order.price, order.user, order.quantity]
        );
    }

    static delete(id) {
        return db.execute('DELETE FROM orders WHERE id = ?', [id]);
    }
};
