const express = require("express");
const UsersController = require('../controllers/UsersController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');
const upload = require('../../../shared/middlewares/uploadImgProfile');

let usersRouter = express.Router();

usersRouter.post("/", isAuthenticated, UsersController.create);

usersRouter.get("/id/:id", isAuthenticated, UsersController.findOne);

usersRouter.get("/page/:page", isAuthenticated, UsersController.findAll);

usersRouter.put("/", isAuthenticated, UsersController.update);

usersRouter.put("/user-password", isAuthenticated, UsersController.updatePassword);

usersRouter.put("/edit-image/:id", isAuthenticated, upload.single('image'), UsersController.updateImage);

module.exports = usersRouter;