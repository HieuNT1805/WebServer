const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  /**
     * @api {POST} /api/auth/signup Create User
     * @apiVersion 1.0.0
     * @apiName signup
     * @apiGroup User
     * @apiPermission Every one
     *
     * @apiDescription Create user 
     *
     * @apiParam {string} userName a unique string with 6 <= length <= 64
     * @apiParam {string} email unique email
     * @apiParam {String} password a string with 6 <= length <= 64
     *
     * @apiExample Example usage:
     * curl -i https://jewel-store-pj.herokuapp.com/api/auth/signup
     *
     * @apiSuccess {String} message registered successfully
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "User was registered successfully!",
     *     }
     *
     * @apiError duplicate Username
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "Failed! Username is already in use!,
     *     }
     * 
     * @apiError duplicate Email
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 400 Bad Request
     *      {
     *        "Failed! Email is already in use!,
     *      }
     
     */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );



  /**
     * @api {POST} /api/auth/signin Signin
     * @apiVersion 1.0.0
     * @apiName signin
     * @apiGroup User
     * @apiPermission Every one
     *
     * @apiDescription login and get access token
     *
     * @apiParam {string} username a string with length <= 10
     * @apiParam {String} password a string with 4 < length < 64
     *
     * @apiExample Example usage:
     * curl -i https://jewel-store-pj.herokuapp.com/api/auth/signin
     *
     * @apiSuccess {object} data the user data with accessToken
     * @apiSuccess {array} roles of user
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "data":{
     *          "id": "1",
     *          "username": "hieunguyen",
     *          "email": trunghieu180501@gmail.com
     *          "accessToken": "abc",
     *       },
     *       "roles": [
     *          "ROLE_USER"
     *        ]
     *     }
     *
     * @apiError invalid username
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "message": "User Not found"
     *     }
     * 
     * @apiError invalid password
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 401 Unauthorized
     *      {
     *        "message": "Invalid Password!"
     *      }
     */
  app.post("/api/auth/signin", controller.signin);
};