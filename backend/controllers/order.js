const { validationResult } = require('express-validator');

const Order = require('../models/order');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allOrders] = await Order.fetchAll(req.params.id);
        res.status(200).json(allOrders);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postOrder = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const user = req.body.user;
    const quantity = req.body.quantity;

    try {
        const order = {
            title: title,
            image: image,
            price: price,
            user: user,
            quantity: quantity,
        };
        const result = await Order.save(order);
        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const deleteResponse = await Order.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
