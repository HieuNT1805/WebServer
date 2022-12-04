const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    ProName:{
        type: String,
        minlength: 5,
        maxlength: 100
    },
    Material : {
        type: String
    },
    Price: {
        type: Number
    },
    Img_link : {
        type: String
    },
    InStock: {
        type: Number
    },
    desc: String
})

const Product = mongoose.model('products', productSchema)
module.exports = Product;