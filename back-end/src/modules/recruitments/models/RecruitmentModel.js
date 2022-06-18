const Sequelize = require('sequelize');
const db = require('../../../shared/database/database');

const RecruitmentModel = db.define('recruitment', {
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
    company: {
        type: Sequelize.STRING,
    },
    occupation: {
        type: Sequelize.STRING,
    },
    owner_id: {
        type: Sequelize.INTEGER,
    }
});

//Criar a tabela
//RecruitmentModel.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//RecruitmentModel.sync({ alter: true });

module.exports = RecruitmentModel;