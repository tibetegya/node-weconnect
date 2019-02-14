const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verifySchema = new Schema({
  userId: { type: String, required: true },
  verifyId: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.model('Verification', verifySchema)
