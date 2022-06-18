const express = require("express");
var dashboardRouter = express.Router();
const { isAuthenticated } = require('../../../shared/middlewares/auth');
const DashboardController = require('../controllers/DashboardController');

dashboardRouter.get("/company", isAuthenticated, DashboardController.findAll);

dashboardRouter.get("/user", isAuthenticated, DashboardController.findOne);

dashboardRouter.get("/admin", isAuthenticated, DashboardController.adm);

module.exports = dashboardRouter;