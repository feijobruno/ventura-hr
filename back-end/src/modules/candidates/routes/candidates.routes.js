const express = require("express");
const CandidatesController = require('../controllers/CandidatesController');
const { isAuthenticated } = require('../../../shared/middlewares/auth');

let candidatesRouter = express.Router();

candidatesRouter.post("/", isAuthenticated, CandidatesController.create);

candidatesRouter.get("/skills/:id", isAuthenticated, CandidatesController.findAll);

candidatesRouter.get("/detail/:id/:id_candidate", isAuthenticated, CandidatesController.findOne);

candidatesRouter.get("/candidatures/:page", isAuthenticated, CandidatesController.search);

module.exports = candidatesRouter;