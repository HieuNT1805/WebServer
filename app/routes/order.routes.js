const controller = require("../controllers/order.controller");
const { auth } = require("../middlewares");

module.exports = function(app){
    /**
     * @api {GET} /api/orders Get Orders
     * @apiVersion 1.0.0
     * @apiName getOrders
     * @apiGroup User
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription get all of orders
     *
     *
     * @apiExample Example usage:
     * curl -i  https://jewel-store-pj.herokuapp.com/api/orders
     *
     * @apiSuccess {Number} count number of orders
     * @apiSuccess {Array} orders list product of orders
     * @apiSuccess {String} _id the ID of orders
     * @apiSuccess {Object} product product data
     * @apiSuccess {Number} quantity quantity of product
     * @apiSuccess {String} buyer Id of buyer's oreders
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "count": 1,
     *       "orders":[
     *            {
     *              "_id": "637b2bc1eded7fc7049721cb",
     *              "product": {
     *                  "_id":"637a36104fd1ba490ff68fdc",
     *                  "name": "pro6",
     *                  "price": 100000
     *               }
     *              "quantity": "3",
     *              "buyer": 637a354d4fd1ba490ff68fd0,
     *           },
     *       ]
     *     }
     *
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
    app.get("/api/orders", auth.verifyToken, controller.getOrders)

    /**
     * @api {GET} /api/orders Get Order
     * @apiVersion 1.0.0
     * @apiName getOrder
     * @apiGroup User
     * @apiPermission Every type of user
     * @apiHeader {String} access_token json web token to access to data
     *
     * @apiDescription get a orders
     *
     * @apiParam {string} id ID of order, on params
     * 
     * @apiExample Example usage:
     * curl -i  https://jewel-store-pj.herokuapp.com/api/orders
     *
     * @apiSuccess {Number} count number of orders
     * @apiSuccess {Array} orders list product of orders
     * @apiSuccess {String} _id the ID of orders
     * @apiSuccess {Object} product product data
     * @apiSuccess {Number} quantity quantity of product
     * @apiSuccess {String} buyer Id of buyer's oreders
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "count": 1,
     *       "orders":[
     *            {
     *              "_id": "637b2bc1eded7fc7049721cb",
     *              "product": {
     *                  "_id":"637a36104fd1ba490ff68fdc",
     *                  "name": "pro6",
     *                  "price": 100000
     *               }
     *              "quantity": "3",
     *              "buyer": 637a354d4fd1ba490ff68fd0,
     *           },
     *       ]
     *     }
     *
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
    
    app.get("/api/orders/:orderId", auth.verifyToken, controller.getOrder)


    app.post("/api/orders", auth.verifyToken, controller.postOrder)

    

    app.delete("/api/orders/:orderId", auth.verifyToken, controller.deleteOrder)
}