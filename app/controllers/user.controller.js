const db = require("../models");
const User = db.user;

exports.updateInformation = (req,res)=>{
    const id = req.userId;
    User.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(()=>{
        res.status(200).json({
            message:"Information Updated Successfully",
        })
    })
    .catch(err=>{
		res.status(500).json({
		   	error:err
		})
    })
}

exports.getUser=(req,res)=>{
    const id = req.userId;
	User.findById(id)
	.select('_id firstname lastname email address contact')
	.exec()
	.then(doc=>{
		res.status(200).json({
		   	product:doc,
		});
		
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
}