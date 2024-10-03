const User = require("../models/User");
const Owner = require("../models/Owner");
const jwt = require('jsonwebtoken');


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '',username: '', password: '' };

  if (err.message === 'User not found') {
    errors.email = 'Invalid credentials';
    errors.username = 'Invalid credentials';
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000 && err.message.includes('email')) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // duplicate username error
  if (err.code === 11000 && err.message.includes('username')) {
    errors.username = 'That username is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// creating json web token for admin
const maxAge2 = 3 * 24 * 60 * 60;
const createToken2 = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge2
  });
};

//controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}
module.exports.geneticx_get = (req, res) => {
  res.render('geneticx');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}
module.exports.login_admin_get = (req, res) => {
  res.render('login_admin');
}
module.exports.signup_admin_get = (req, res) => {
  res.render('signup_admin');
}

module.exports.signup_post = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({ email,username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.signup_admin_post = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const owner = await Owner.create({ email,username, password });
    const token2 = createToken2(owner._id);
    res.cookie('jwt', token2, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ owner: owner._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const {email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.login_admin_post = async (req, res) => {
  const {email, password } = req.body;

  try {
    const owner = await Owner.login(email, password);
    const token2 = createToken2(owner._id);
    res.cookie('jwt', token2, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ owner: owner._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');

}