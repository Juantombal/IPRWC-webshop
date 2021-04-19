const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allProducts] = await Product.fetchAll();
        res.status(200).json(allProducts);
    } catch (err) {
        if (!err.statusCode) {
            console.log("error");
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const [getProduct] = await Product.getProductById(req.params.id);
        res.status(200).json(getProduct);
    } catch (err) {
        if (!err.statusCode) {
            console.log("error");
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postProduct = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    try {

        const findImage = await Product.find(image);
        if (findImage[0].length > 0) {
            const errorStatus = new Error('Product already exists!');
            errorStatus.statusCode = 500;
            throw errorStatus;
        }

        const product = {
            title: title,
            image: image,
            description: description,
            price: price,
            quantity: quantity,
        };

        const result = await Product.save(product);
        res.status(201).json({ message: 'Added Product!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log('try')
        }
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    try {

        const product = {
            title: title,
            image: image,
            description: description,
            price: price,
            quantity: quantity,
        };

        const result = await Product.update(product, req.params.id);
        res.status(201).json({ message: 'Added Product!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.log('try')
        }
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {

        const deleteResponse = await Product.delete(req.params.id);

        res.status(201).json({ message: 'Deleted!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
