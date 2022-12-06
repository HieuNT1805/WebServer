
const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary")


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
		ProName:req.body.name,
		Price : req.body.price,
		Material : req.body.material,
		desc : req.body.desc
	});

	product.save()
	.then(result => {
		res.status(201).json({
			message : 'Product Created Successfully!!',
			createdProduct:{
				id:result.id,
				name:result.ProName,
				price:result.Price,
                material:req.body.Material,
                desc:req.body.desc
			}
		});
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		});
	});
};

exports.uploadImg = (req,res)=>{
	const id = req.params.productId;
	try{
		cloudinary.uploader.upload(req.file.path)
		.then(result=>{
			Product.findByIdAndUpdate(id, {Img_link: result.url}, {new:true})
			.exec()
			.then(result=>{
				res.status(200).json({
					message:"Product uploadImg Successfully",
					result
				})
			})
			.catch(err=>{
				res.status(500).json({
					error:err
				})
			})
		});
	}
	catch(err)
	{
		console(err)
	}
	
	
}
exports.getProduct = (req,res)=>{
	const id = req.params.productId;
	Product.findById(id)
	.select('_id ProName Price Material desc Img_link')
	.exec()
	.then(doc=>{
		if(doc){
		   	res.status(200).json({
				product:{
					id:doc.id,
		   			name:doc.ProName,
					material:doc.Material,
		   			price:doc.Price,
					img: doc.Img_link,
					desc: doc.desc
				}
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