const express = require("express");
const SkillsController = require('../controllers/SkillsController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');

let skillsRouter = express.Router();

skillsRouter.post("/", isAuthenticated, SkillsController.create);
skillsRouter.get("/:id", isAuthenticated, SkillsController.findOne);

module.exports = skillsRouter;