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

    static getTotalPrice(id) {
        return db.execute('SELECT sum(price*quantity) AS Totaalprijs FROM orders WHERE user = ?', [id]);
    }

    static save(order) {
        return db.execute(
            'INSERT INTO orders (title, image, price, user, quantity) VALUES (?, ?, ?, ?, ?)',
            [order.title, order.image, order.price, order.user, order.quantity]
        );
    }
    static upQuantity(id) {
        return db.execute(
            'UPDATE orders SET quantity = quantity + 1 WHERE id = ?', [id],
        );
    }
    static downQuantity(id) {
        return db.execute(
            'UPDATE orders SET quantity = quantity - 1 WHERE id = ?', [id],
        );
    }

    static find(findUserImage) {
        return db.execute('SELECT * FROM orders WHERE image = ? AND user = ?', [findUserImage.image, findUserImage.user]);
    }

    static delete(id) {
        return db.execute('DELETE FROM orders WHERE id = ?', [id]);
    }

    static deleteAll(id) {
        return db.execute('DELETE FROM orders WHERE user = ?', [id]);
    }
};
