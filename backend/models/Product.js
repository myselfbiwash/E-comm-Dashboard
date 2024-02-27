const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  price: {
      type: Number,
      required: true,
      min: 0
  },
  category: {
      type: String,
      required: true,
      trim: true
  },
  company: {
      type: String,
      required: true,
      trim: true
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
  },
  number: {
      type: Number,
      required: true,
      min: 0
  },
  photo: {
      type: String,
  },
  pid: {
      type: String,
      required: true,
  }
});