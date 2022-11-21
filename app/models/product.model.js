const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    price : {
        type:Number,
        required:true
    },
    stock: {
        type:Number,
    },
    proType: {
        type: String,
    },
    productImage: String,
    
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;