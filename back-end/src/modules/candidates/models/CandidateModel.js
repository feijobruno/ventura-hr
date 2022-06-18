const Sequelize = require('sequelize');
const db = require('../../../shared/database/database');

const CandidateModel = db.define('candidate', {
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
    id_candidate: {
        type: Sequelize.INTEGER,
        // allowNull: false,
    },
    skill: {
        type: Sequelize.STRING,
    },
    profile: {
        type: Sequelize.STRING,
    }
});

//Criar a tabela
//CandidateModel.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//CandidateModel.sync({ alter: true });

module.exports = CandidateModel;