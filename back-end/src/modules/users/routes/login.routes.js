const express = require("express");
const LoginController = require('../controllers/LoginController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');
const upload = require('../../../shared/middlewares/uploadImgProfile');

let loginRouter = express.Router();

loginRouter.post("/", LoginController.create);

loginRouter.get("/val-token", isAuthenticated, LoginController.findOne);

loginRouter.post("/add-user-login", LoginController.createUserLogin);

loginRouter.post("/recover-password", LoginController.RecoverPassword);

loginRouter.get("/val-key-recover-pass/:key", LoginController.validateKey);

loginRouter.put("/update-password/:key", LoginController.update);

module.exports = loginRouter;