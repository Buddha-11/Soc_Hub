const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Owner = require('../models/Owner');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        
        res.render('./login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.render('./login');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkOwner = (req, res, next) => {
  const token2 = req.cookies.jwt;
  if (token2) {
    jwt.verify(token2, 'net ninja secret_admin', async (err, decodedToken) => {
      if (err) {
        res.locals.owner = null;
        next();
      } else {
        let owner = await Owner.findById(decodedToken.id);
        res.locals.owner = owner;
        next();
      }
    });
  } else {
    res.locals.owner = null;
    next();
  }
};


module.exports = { requireAuth, checkUser, checkOwner};