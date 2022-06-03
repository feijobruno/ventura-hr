const express = require("express");
var cors = require('cors');

const path = require('path');
require('dotenv').config();

const user = require("./controllers/user");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const job = require("./controllers/job");
const job_skill = require("./controllers/jobSkill");

const app = express();

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});

app.use('/user', user);
app.use('/login', login);
app.use('/profile', profile);
app.use('/job', job);
app.use('/job_skill', job_skill);


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});