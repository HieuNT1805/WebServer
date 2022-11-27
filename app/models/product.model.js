const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    price : Number,
    stock : Number,
    proType: String,
    proBrand: String,
    productImage: String,
    
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;