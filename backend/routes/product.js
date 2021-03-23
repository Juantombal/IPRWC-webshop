const express = require('express');

const { body } = require('express-validator');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', productController.fetchAll);


module.exports = router;
