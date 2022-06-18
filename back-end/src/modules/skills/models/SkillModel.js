const Sequelize = require('sequelize');
const db = require('../../../shared/database/database');

const SkillModel = db.define('skills', {
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
//SkillModel.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//SkillModel.sync({ alter: true });

module.exports = SkillModel;