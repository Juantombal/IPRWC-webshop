const { validationResult } = require('express-validator');

const Order = require('../models/order');

exports.getOrder = async (req, res, next) => {
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
exports.getTotalPrice = async (req, res, next) => {
    try {
        const [getTotal] = await Order.getTotalPrice(req.params.id);

        res.status(200).json(getTotal);

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
        const findUserImage = {
            image: image,
            user: user,
        };
        const findImage = await Order.find(findUserImage);

        if(findImage[0].length > 0){
            const okStatus = new Error('Image exists!');
            okStatus.statusCode = 200;
            throw okStatus;
        }

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
exports.update = async (req, res, next) => {
    const btNr = req.body.buttonNr;
    const quantity = req.body.quantity;
    try {
        if(btNr === 2){
            if(quantity > 1){
                const up = await Order.downQuantity(req.params.id);
            }
            else{
                const okStatus = new Error('Quantity cant go lower then 0');
                okStatus.statusCode = 200;
                throw okStatus;
            }
        }
        else {
            const up = await Order.upQuantity(req.params.id);
        }
        res.status(201).json({ message: 'Updated!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleteResponse = await Order.deleteAll(req.params.id);

        const deleteResponse2 = await Order.delete(req.params.id);

        res.status(201).json({ message: 'Deleted!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
