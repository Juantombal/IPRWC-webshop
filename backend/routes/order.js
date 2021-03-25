const express = require('express');

const { body } = require('express-validator');

const orderController = require('../controllers/order');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, orderController.fetchAll);

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

router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
