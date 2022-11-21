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

    app.get("/api/products",controller.getAllProducts);

    app.get("/api/products/:productId", controller.getProduct);

    app.post("/api/products",[auth.verifyToken, auth.isModerator],controller.postNewProduct);

    app.patch("/api/products/:productId",[auth.verifyToken, auth.isModerator], controller.updateProduct);

    app.delete("/api/products/:productId",[auth.verifyToken, auth.isModerator], controller.deleteProduct);
};