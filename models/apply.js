const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applySchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
    roll:{
        type:String,
        required:[true, 'Please enter your roll no.'],
    },
    name:{
        type:String,
        required:[true, 'Please enter your name'],
    },
    contact:{
        type:String,
        required:[true, 'Please enter your contact no.'],
    },
    drive:{
        type:String,
        required:[true, 'Please enter the drive link'],
    }
},{timestamps:true});

const Apply = mongoose.model('Apply',applySchema);
module.exports = Apply;