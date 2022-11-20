const controller = require("../controllers/order.controller");
const { auth } = require("../middlewares");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.get("/api/orders",auth.verifyToken, controller.getOrders)

      app.post("/api/orders",auth.verifyToken, controller.postOrder)
}