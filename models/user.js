const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {type: String, required: true, max: 100},
  firstName: {type: String, required: true, max: 100},
  lastName: {type: String, required: true, max: 100},
  password: {type: String, required: true},
  email: {type: String, required: true, max: 100},
  profilePhoto: {type: String, required: false, max: 150},
  bio: {type: String, required: false, max: 300},
  interests: [ String ],
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.methods.cleanedFeilds = function(){
  const { 
    _id,
    username,
    firstName,
    lastName,
    email,
    profilePhoto,
    bio,
    interests,
    isVerified
  } = this
  const id = _id
  return { 
    id,
    username,
    firstName,
    lastName,
    email,
    profilePhoto,
    bio,
    interests,
    isVerified
  };
}

module.exports =  mongoose.model('User', userSchema)