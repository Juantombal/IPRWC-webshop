const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.fetchAll = async (req, res, next) => {
    try {
        const [allProducts] = await Product.fetchAll();
        res.status(200).json(allProducts);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
