
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cartPid: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productIds: [{
      type: String,
      ref: 'Product',
    }],
    totalAmount: {
      type: Number,
      required: true,
    }, 
    });

module.exports = mongoose.model('Cart', CartSchema);