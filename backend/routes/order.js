const Order = require('../models/order');

const express = require('express');

const { body } = require('express-validator');

const orderController = require('../controllers/order');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, orderController.getOrder);

router.get('/price/:id', auth, orderController.getTotalPrice);

router.post(
    '/',
    [
        auth,
        body('title').not().isEmpty(),
        body('image').not().isEmpty(),
        body('price').not().isEmpty(),
        body('user').not().isEmpty(),
        body('quantity'),
    ],
    orderController.postOrder
);

router.delete('/:id', auth,  orderController.delete);

router.put('/:id', auth,  orderController.update);

module.exports = router;
