const db = require('../../../shared/database/database');
const CandidateModel = require('../models/CandidateModel');
const JobModel = require('../../jobs/models/JobModel');
const SkillModel = require('../../skills/models/SkillModel');
const { Op, QueryTypes } = require("sequelize");

module.exports = {
    create: async function (req, res) {
        const data = req.body;
        data.id_candidate = req.userId;

        const skill = await CandidateModel.findOne({
            where: {
                [Op.and]: [
                    { skill: data.skill },
                    { id_candidate: data.id_candidate },
                    { id_job: data.id_job }
                ]
            }
        });

        if (skill) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Este critério já está cadastrado! skill: " + data.skill
            });
        }

        await CandidateModel.create(data)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Experiência cadastrada com sucesso!"
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Experiência não cadastrada com sucesso!"
                });
            });
    },
    findAll: async function (req, res) {
        const { id } = req.params;
        const id_user = req.userId;
        const skill = await CandidateModel.findAll({
            where: {
                [Op.and]: [
                    { id_job: id },
                    { id_candidate: id_user }
                ]
            }
        })
        return res.json({
            erro: false,
            skill: skill
        });
    },
    findOne: async function (req, res) {
        const { id } = req.params.id;
        const { id_candidate } = req.params.id_candidate;

        const job = await JobModel.findByPk(id);
        const skill = await SkillModel.findAll({
            where: { id_job: id }
        });
        const candidate = await CandidateModel.findAll({
            where: {
                [Op.and]: [
                    { id_job: id },
                    { id_candidate: id_candidate }
                ]
            }
        });
        return res.json({
            erro: false,
            job,
            skill,
            candidate
        });
    },
    search: async function (req, res) {

        const id_candidate = req.userId;
        const { page = 1 } = req.params;
        const limit = 5;
        var lastPage = 1;

 
        const countCandidatures = await db.query("SELECT count(id_job) as count FROM `ventura-hr`.vw_candidatures where id_candidate = " + id_candidate , { type: QueryTypes.SELECT });
        
        if (countCandidatures === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma candidatura encontrada!"
            });
        } else {
            lastPage = Math.ceil(countCandidatures / limit);
        }

        await db.query("SELECT * FROM `ventura-hr`.vw_candidatures WHERE ID_CANDIDATE = " + id_candidate, { type: QueryTypes.SELECT })  
        .then((candidatures) => {
                return res.json({
                    erro: false,
                    candidatures,
                    countCandidatures,
                    lastPage
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    }
}