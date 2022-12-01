
const Product = require("../models/product.model");


exports.getAllProducts = (req, res) =>{
    Product.find()
    .select('_id ProName Material Price Img_link')
	.exec()
	.then(docs=>{
		const response = {
		   	count:docs.length,
		   	products:docs.map((doc)=>{
		   		return {
		   			id:doc.id,
		   			name:doc.ProName,
					material:doc.Material,
		   			price:doc.Price,
					img: doc.Img_link,
		
		   		}
		   	})
		}
		res.status(200).json(response);
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
}

exports.postNewProduct = (req,res)=>{
	const product = new Product({
		name:req.body.name,
		price : req.body.price,
        stock:req.body.stock,
        proType:req.body.proType
	});

	product.save()
	.then(result => {
		res.status(201).json({
			message : 'Product Created Successfully!!',
			createdProduct:{
				_id:result.id,
				name:result.name,
				price:result.price,
                stock:req.body.stock,
                proType:req.body.proType
			}
		});
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		});
	});
};

exports.getProduct = (req,res)=>{
	const id = req.params.productId;
	Product.findById(id)
	.select('_id name price stock proType')
	.exec()
	.then(doc=>{
		if(doc){
		   	res.status(200).json({
		   		product:doc,
		   	});
		}
		else{
		   	res.status(404).json({
		   		message:"No such Product Found!!"
		   	});
		}
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
};

exports.updateProduct = (req,res)=>{
    const id = req.params.productId;

    Product.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"Product Updated Successfully",
            result
        })
    })
    .catch(err=>{
		res.status(500).json({
		   	error:err
		})
    })
}

exports.deleteProduct = (req, res)=>{
    const id = req.params.productId;
	
    Product.findByIdAndDelete(id)
    .exec()
    .then((result)=>{
        res.status(200).json({
			data:{
				_id:result._id,
			},
            message:"Product Deleted"
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}