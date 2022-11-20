const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
   product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
   },
   quantity: {
        type:Number,
        default:1
    },
    date: {
        type: Date,
        default: Date.now
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
  }
    
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;