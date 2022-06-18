const UserModel = require('../models/UserModel');
require('dotenv').config();
const yup = require('yup');
const nodemailer = require('nodemailer');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports = {
    create: async function (req, res) {
        const user = await UserModel.findOne({
            attributes: ['id', 'name', 'email', 'password', 'account_type', 'owner_id','image'],
            where: {
                email: req.body.email
            }
        });
        if (user === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário ou a senha incorreta!"
            });
        };
    
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário ou a senha incorreta!"
            });
        };
    
        var token = jwt.sign({ id: user.id, account_type: user.account_type, owner_id: user.owner_id }, process.env.SECRET, {
            //expiresIn: 600 // 10min
            expiresIn: '7d', // 7 dia
        });
    
        const { id, name, account_type, owner_id, image } = user;
    
        if (image) {
            var endImage = process.env.URL_IMG + "/files/users/" + image;
        } else {
            var endImage = process.env.URL_IMG + "/files/users/icone_usuario.png";
        }
    
        return res.json({
            erro: false,
            mensagem: "Login realizado com sucesso!",
            user: { id, name, account_type, owner_id, image: endImage },
            token
        });
    },
    findOne: async function (req, res) {
        await UserModel.findByPk(req.userId, { attributes: ['id', 'name', 'email'] })
        .then((user) => {
            return res.json({
                erro: false,
                user
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        });
    },
    update: async function (req, res) {
        const { key } = req.params;
        const { password } = req.body;
    
        const schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!")
                .required("Erro: Necessário preencher o campo senha!")
                .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
        });
    
        try {
            await schema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: err.errors
            });
        }
    
        var senhaCrypt = await bcrypt.hash(password, 8);
    
        await UserModel.update({ password: senhaCrypt, recover_password: null }, { where: { recover_password: key } })
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Senha editada com sucesso!"
                });
    
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Senha não editada com sucesso!"
                });
            });
    },
    createUserLogin: async function (req, res) {
        const data = req.body;
        data.account_type = "candidate";

        const schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!")
                .required("Erro: Necessário preencher o campo senha!")
                .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .email("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!")
        });
    
        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: err.errors
            });
        }
    
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        });
    
        if (user) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Este e-mail já está cadastrado!"
            });
        }
    
        data.password = await bcrypt.hash(data.password, 8);
    
        await UserModel.create(data)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário cadastrado com sucesso!"
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Usuário não cadastrado com sucesso!"
                });
            });
    },
    RecoverPassword: async function (req, res) {
        var data = req.body;

        const user = await UserModel.findOne({
            attributes: ['id', 'name', 'email'],
            where: {
                email: data.email
            }
        });
        if (user === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não encontrado!"
            });
        };
    
        data.recover_password = (await bcrypt.hash(user.id + user.name + user.email, 8)).replace(/\./g, "").replace(/\//g, "");
    
        await UserModel.update(data, { where: { id: user.id } })
            .then(() => {
                var transport = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });
    
                var message = {
                    from: process.env.EMAIL_FROM_PASS,
                    to: data.email,
                    subject: "Instrução para recuperar a senha",
                    text: "Prezado(a)  " + user.name + ".\n\nVocê solicitou alteração de senha.\n\nPara continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço no seu navegador: " + data.url + data.recover_password + " \n\nSe você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código.\n\n",
                    html: "Prezado(a) " + user.name + ".<br><br>Você solicitou alteração de senha.<br><br>Para continuar o processo de recuperação de sua senha, clique no link abaixo ou cole o endereço no seu navegador: <a href='" + data.url + data.recover_password + "'>" + data.url + data.recover_password + "</a> <br><br>Se você não solicitou essa alteração, nenhuma ação é necessária. Sua senha permanecerá a mesma até que você ative este código.<br><br>"
                };
    
                transport.sendMail(message, function (err) {
                    if (err) return res.status(400).json({
                        erro: true,
                        mensagem: "Erro: E-mail com as intruções para recuperar a senha não enviado, tente novamente!"
                    });
    
                    return res.json({
                        erro: false,
                        mensagem: "Enviado e-mail com instruções para recuperar a senha. Acesse a sua caixa de e-mail para recuperar a senha!"
                    });
                });
    
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: E-mail com as intruções para recuperar a senha não enviado, tente novamente!"
                });
            });
    }
    ,
    validateKey: async function (req, res) {
        const { key } = req.params;

        const user = await UserModel.findOne({
            attributes: ['id'],
            where: {
                recover_password: key
            }
        });
        if (user === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Link inválido!"
            });
        };
    
        return res.json({
            erro: false,
            mensagem: "Chave é valida!"
        });
    }
}