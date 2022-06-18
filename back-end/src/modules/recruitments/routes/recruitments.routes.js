const express = require("express");
const Recruitmentscontroller = require('../controllers/RecruitmentsController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');

let recruitmentsRouter = express.Router();

recruitmentsRouter.post("/", isAuthenticated, Recruitmentscontroller.create);

recruitmentsRouter.get("/job-score/:id", isAuthenticated, Recruitmentscontroller.findAll);

recruitmentsRouter.get("/candidates/", isAuthenticated, Recruitmentscontroller.findOne);

module.exports = recruitmentsRouter;