const Sequelize = require('sequelize');
const db = require('./db');

const JobSkill = db.define('job_candidate', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_job: {
        type: Sequelize.INTEGER,
        // allowNull: false,
    },
    id_skill: {
        type: Sequelize.INTEGER,
    },
    skill: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    profile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    weight: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

//Criar a tabela
//JobSkill.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//JobSkill.sync({ alter: true });

module.exports = JobCandidate;