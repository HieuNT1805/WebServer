const controller = require("../controllers/order.controller");
const { auth } = require("../middlewares");

module.exports = function(app){

    app.get("/api/orders", auth.verifyToken, controller.getOrders)

    app.post("/api/orders", auth.verifyToken, controller.postOrder)

    app.get("/api/orders/:orderId", auth.verifyToken, controller.getOrder)

    app.delete("/api/orders/:orderId", auth.verifyToken, controller.deleteOrder)
}