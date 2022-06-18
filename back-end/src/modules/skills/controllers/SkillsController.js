const SkillModel = require('../models/SkillModel');
const { Op } = require("sequelize");

module.exports = {
    findOne: async function (req, res) {
        const { id } = req.params;

        await SkillModel.findAll({
            attributes: ['id', 'id_job', 'skill', 'description', 'profile', 'weight'],
            where: { id_job: id },
            order: [['id', 'DESC']]
        })
            .then((skill) => {
                return res.json({
                    erro: false,
                    skill
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma critério encontrada!"
                });
            });
    },
    create: async function (req, res) {
        var data = req.body;

        const skill = await SkillModel.findOne({
            where: {
                [Op.and]: [
                    { skill: req.body.skill },
                    { id_job: req.body.id_job }
                ]
            }
        }
        );

        if (skill) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Esse critério já foi cadastrado!"
            });
        }
        await SkillModel.create(data)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Critério cadastrado com sucesso!"
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Critério não cadastrado com sucesso!"
                });
            });
    }
}