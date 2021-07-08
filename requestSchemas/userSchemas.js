const Joi = require('joi');

const alphaNum = Joi.string().alphanum().min(3).max(100)
const name = Joi.string().min(3).max(30)
const regularString = Joi.string()
const longString = Joi.string().max(150)
const email = Joi.string().email({ minDomainAtoms: 2 })
const text = Joi.string().max(300)
const password = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
const arr = Joi.array()

const registerSchema = Joi.object().keys({
  username: alphaNum.required(),
  firstName: name.required(),
  lastName: name.required(),
  profilePhoto: longString,
  email: email.required(),
  bio: text,
  password: password.required(),
  interests: arr,
})

const updateSchema = Joi.object().keys({
  username: alphaNum,
  firstName: name,
  lastName: name,
  profilePhoto: longString,
  email: email,
  bio: text,
  interests: arr,
})

const loginSchema = Joi.object().keys({
  username: longString.required(),
  password: longString.required()
})

const resetSchema = Joi.object().keys({
  username: longString,
  email: email,
}).or('username', 'email')

module.exports = {
  register: registerSchema,
  update: updateSchema,
  login: loginSchema,
  reset: resetSchema,
}