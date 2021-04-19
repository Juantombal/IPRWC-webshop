const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const auth = require('../middleware/auth');

const authController = require('../controllers/auth');

router.get('/', authController.fetchAll);

router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('postcode').trim(),
    body('street').trim(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);

router.post('/login', authController.login);


router.put('/:id', auth,  authController.update);

module.exports = router;
