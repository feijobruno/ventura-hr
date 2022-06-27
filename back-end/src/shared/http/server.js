const express = require("express");
var cors = require('cors');
const path = require('path');
require('dotenv').config();

const candidatesRouter = require("../../modules/candidates/routes/candidates.routes");
const dashboardRouter = require("../../modules/jobs/routes/dashboard.routes");
const homeRouter = require("../../modules/jobs/routes/home.routes");
const jobsRouter = require("../../modules/jobs/routes/jobs.routes");
const loginRouter = require("../../modules/users/routes/login.routes");
const profileRouter = require("../../modules/users/routes/profile.routes");
const recruitmentsRouter = require("../../modules/recruitments/routes/recruitments.routes");
const skillsRouter = require("../../modules/skills/routes/skills.routes");
const usersRouter = require("../../modules/users/routes/users.routes");

const app = express();

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "../../../public", "upload")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});

app.use('/candidates', candidatesRouter);
app.use('/dashboard', dashboardRouter);
app.use('/home', homeRouter);
app.use('/jobs', jobsRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/recruitments', recruitmentsRouter);
app.use('/skills', skillsRouter);
app.use('/users', usersRouter);

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});