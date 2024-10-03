const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const ownerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
    minlength: [3, 'Minimum username length is 3 characters'],
    maxlength: [20, 'Maximum username length is 20 characters'],
    
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
});


// fire a function before doc saved to db
ownerSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
ownerSchema.statics.login = async function(email, password) {
  const owner = await this.findOne({
    $or: [
       {email}
    ]
  });

  if (!owner) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, owner.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return user; 
};
const Owner = mongoose.model('owner', ownerSchema);

module.exports = Owner;