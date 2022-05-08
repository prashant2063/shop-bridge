const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required : true},
    description: {type: String, required : true},
    price: {type: Number, required : true},
    image: {type: String},
    update_time: {type: String},
})

module.exports = mongoose.model('products', productSchema)