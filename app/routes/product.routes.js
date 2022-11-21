const controller = require("../controllers/product.controller");
const { auth } = require("../middlewares");

module.exports = function(app){  
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @api {GET} /api/products/:productId Get a product
     * @apiVersion 1.0.0
     * @apiName getProduct
     * @apiGroup User
     * @apiPermission Every one
     *
     * @apiDescription Get one product
     * 
     * @apiParam {string} id ID of product, on params
     *
     * @apiExample Example usage:
     * curl -i https://jewel-store-pj.herokuapp.com/api/products/637a316c457d58c281b4bb3a 
     *
     * @apiSuccess {String} _id the id of product
     * @apiSuccess {String} name name of product
     * @apiSuccess {Number} price price of product
     * @apiSuccess {Number} stock stock of product
     * @apiSuccess {String} proType type of product
     * 
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "products":{
     *          "_id": "637a316c457d58c281b4bb3a",
     *          "name": "pro3",
     *          "price": 100000,
     *          "stock": 100,
     *          "proType": "ring"
     *       },
     *     }
     *
     * @apiError Not found product
     * 
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 404 Not Found
     *    {
     *      "message": "No such Product Found!!"
     *    }
     * 
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     */

    app.get("/api/products/:productId", controller.getProduct);
    /**
     * @api {GET} /api/products Get all products
     * @apiVersion 1.0.0
     * @apiName getAllProducts
     * @apiGroup User
     * @apiPermission Every one
     *
     * @apiDescription List all of product
     *
     * @apiExample Example usage:
     * curl -i https://jewel-store-pj.herokuapp.com/api/products 
     *
     * @apiSuccess {Number} count the number of product
     * @apiSuccess {Array} products list data of product
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "count": 2,
     *       "products":[
     *            {
     *              "_id": "637a316c457d58c281b4bb3a",
     *              "name": "pro3",
     *               "price": 100000,
     *               "stock": 100,
     *               "proType": "ring"
     *           },
     *           {
     *               "_id": "637a3174457d58c281b4bb3e",
     *               "name": "pro5",
     *               "price": 100000,
     *              "stock": 100,
     *               "proType": "ring"
     *           },
     *       ],
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     */
    app.get("/api/products",controller.getAllProducts);

    /**
     * @api {POST} /api/manage/products Add one
     * @apiVersion 1.0.0
     * @apiName addProduct
     * @apiGroup User
     * @apiPermission just moderator user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription add product
     *
     * @apiParam {String} name Name of user
     * @apiParam {Number} price Price of product
     * @apiParam {Number} stock Stock of Product
     * @apiParam {String} proType Type of product
     *
     * @apiExample Example usage:
     * curl -i  https://jewel-store-pj.herokuapp.com/api/manage/products
     *
     * @apiSuccess {Object} createdProduct information of product
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "message":"Product Created Successfully!!"
     *          "createdProduct"{
     *                "_id": "637b67b0ae7df78fd496a6dc",
     *                "name": "pro7",
     *                "price": 100000,
     *                "stock": "10",
     *                "proType": "ring"
     *          }
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.post("/api/manage/products",[auth.verifyToken, auth.isModerator],controller.postNewProduct);
    
    /**
     * @api {PATCH} /api/manage/products/:productId Update
     * @apiVersion 1.0.0
     * @apiName updateProduct
     * @apiGroup User
     * @apiPermission just moderator user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription update product
     *
     * @apiParam {string} id ID of product, on params
     * @apiParam {String} name Name of user (option)
     * @apiParam {Number} price Price of product (option)
     * @apiParam {Number} stock Stock of Product (option)
     * @apiParam {String} proType Type of product (option)
     *
     * @apiExample Example usage:
     * curl -i  https://jewel-store-pj.herokuapp.com/api/manage/products/637a316c457d58c281b4bb3a
     *
     * @apiSuccess {Object} createdProduct information of product
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "message":"Product Updated Successfully"
     *          "result"{
     *                "_id": "637b67b0ae7df78fd496a6dc",
     *                "name": "pro7",
     *                "price": 100000,
     *                "stock": "10",
     *                "proType": "ring"
     *          }
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.patch("/api/manage/products/:productId",[auth.verifyToken, auth.isModerator], controller.updateProduct);
    
    /**
     * @api {DELETE} /api/manage/products/:productId Delete
     * @apiVersion 1.0.0
     * @apiName deleteProduct
     * @apiGroup User
     * @apiPermission just moderator user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription delete product
     *
     * @apiParam {string} id ID of product, on params
     *
     * @apiExample Example usage:
     * curl -i  https://jewel-store-pj.herokuapp.com/api/manage/products/637a316c457d58c281b4bb3a
     *
     * @apiSuccess {String} _id Id of deleted product
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data"{
     *                "_id": "637b67b0ae7df78fd496a6dc",
     *          }
     *          "message":"Product Updated Successfully"
     *     }
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     */
    app.delete("/api/manage/products/:productId",[auth.verifyToken, auth.isModerator], controller.deleteProduct);
};