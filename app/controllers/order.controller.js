const { response } = require("express");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.getOrders = (req, res)=>{
    Order.find({buyer: req.userId})
    .select("productId quantity _id buyer")
    .exec()
    .then(doc=>{
        const response = {
            count : doc.length,
            orders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    productId: doc.productId,
                    quantity: doc.quantity,
                    buyer: doc.buyer,
                }
            })
        }
        res.status(200).json({response})
    })
    .catch(err=>{
        res.status(500).json({error:err});
    })
}

exports.postOrder = (req, res)=>{
    Product.findById(req.body.productId)
    .exec()
    .then(product =>{
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }

        const order = new Order({
            productId: req.body.productId,
            quantity: req.body.quantity,
            buyer: req.userId
        })
        return order.save()
    })
    .then(result=>{
        res.status(201).json({
            message:"Order Stored",
            currentOrder:{
                _id: result._id,
                productId: result.productId,
                quantity: result.quantity
            }
        })
    })
    .catch(err=>{
        res.status(500).json({error: err});
    })
}

