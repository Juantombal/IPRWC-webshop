const express = require('express');

const { body } = require('express-validator');

const productController = require('../controllers/product');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', productController.fetchAll);

router.get('/:id', auth, productController.getProductById);

router.post(
    '/',
    [
        auth,
        body('title').not().isEmpty(),
        body('image').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('quantity'),
    ],
    productController.postProduct
);

router.put('/:id', [
        auth,
        body('title').not().isEmpty(),
        body('image').not().isEmpty(),
        body('description').not().isEmpty(),
        body('price').not().isEmpty(),
        body('quantity'),
    ],
    productController.updateProduct
);

router.delete('/:id', auth,  productController.delete);

module.exports = router;
