const Sequelize = require('sequelize');
const db = require('../../../shared/database/database');

const UserModel = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING
    },
    recover_password: {
        type: Sequelize.STRING
    },
    account_type: {
        type: Sequelize.STRING
    },
    cpf: {
        type: Sequelize.STRING
    },
    razao_social: {
        type: Sequelize.STRING
    },
    cnpj: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    owner_id: {
        type: Sequelize.INTEGER,
    }
});

//Criar a tabela
//UserModel.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//UserModel.sync({ alter: true });

module.exports = UserModel;