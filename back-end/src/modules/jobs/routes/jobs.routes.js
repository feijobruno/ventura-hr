const express = require("express");
const JobsController = require('../controllers/JobsController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');

let jobsRouter = express.Router();

jobsRouter.post("/", isAuthenticated, JobsController.create);

jobsRouter.get("/page/:page", isAuthenticated, JobsController.findAll);

jobsRouter.get("/id/:id", isAuthenticated, JobsController.findOne);

jobsRouter.put("/", isAuthenticated, JobsController.update);

jobsRouter.post("/search/:page", isAuthenticated, JobsController.search);

jobsRouter.post("/reply/:page", isAuthenticated, JobsController.reply);

module.exports = jobsRouter;