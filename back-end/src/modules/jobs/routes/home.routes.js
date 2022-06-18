const express = require("express");
const HomeController = require('../controllers/HomeController');
let homeRouter = express.Router();

homeRouter.get("/", HomeController.findAll);

module.exports = homeRouter;