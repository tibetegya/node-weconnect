const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetSchema = new Schema({
  userId: { type: String, required: true },
  resetId: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.model('PaswordReset', resetSchema)
