const Sequelize = require('sequelize');
const db = require('../../../shared/database/database');

const JobModel = db.define('jobs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    company: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    uf: {
        type: Sequelize.STRING
    },
    hiring_type: {
        type: Sequelize.STRING
    },
    hiring_period: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    },
    deadline: {
        type: Sequelize.DATE
    }
});

//Criar a tabela
//JobModel.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//JobModel.sync({ alter: true });

module.exports = JobModel;