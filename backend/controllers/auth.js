const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const postcode = req.body.postcode;
  const street = req.body.street;
  const password = req.body.password;

  try {

    const user = await User.find(email);
    if (user[0].length > 0) {
      const errorStatus = new Error('Email already exists!');
      errorStatus.statusCode = 500;
      throw errorStatus;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      postcode: postcode,
      street: street,
      password: hashedPassword,
      isadmin: false,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
        userName: storedUser.name,
        userRole: storedUser.isadmin,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id, userName: storedUser.name, userRole: storedUser.isadmin});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchAll = async (req, res, next) => {
  try {
    const [allUsers] = await User.fetchAll();
    res.status(200).json(allUsers);
  } catch (err) {
    if (!err.statusCode) {
      console.log("error");
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {

  const btNr = req.body.btnNr;

  try {
    if(btNr === 1){
      const up = await User.makeAdmin(req.params.id);
    }
    else{
      if(req.params.id == 4){
        const error = new Error('CEO cant be removed!');
        error.statusCode = 500;
        throw error;
      }
      else {
        const down = await User.makeNotAdmin(req.params.id);
      }
    }

    res.status(201).json({ message: 'Updated!' });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
