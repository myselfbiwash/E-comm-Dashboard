const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId: ObjectId,
    number: Number,

});

module.exports = mongoose.model("products",productSchema);
