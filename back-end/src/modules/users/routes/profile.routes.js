const express = require("express");
const ProfileController = require('../controllers/ProfileController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');
const upload = require('../../../shared/middlewares/uploadImgProfile');

let profileRouter = express.Router();

profileRouter.get("/", isAuthenticated, ProfileController.findOne);

profileRouter.put("/", isAuthenticated, ProfileController.update);

profileRouter.put("/edit-password", isAuthenticated, ProfileController.updatePassword);

profileRouter.put("/edit-image", isAuthenticated, upload.single('image'), ProfileController.updateImage);

module.exports = profileRouter;