const db = require('../../../shared/database/database');
const JobModel = require('../models/JobModel');
const RecruitmentModel = require('../../recruitments/models/RecruitmentModel');
const CandidateModel = require('../../candidates/models/CandidateModel');
const UserModel = require('../../users/models/UserModel');
const { Op, QueryTypes } = require("sequelize");

module.exports = {
    findAll: async function (req, res) {
        const owner_id = req.owner_id;
        const jobsCount = await JobModel.count({ where: { owner_id: owner_id } });
        const jobsRecruted = await RecruitmentModel.count({ where: { owner_id: owner_id } });
        await JobModel.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 4,
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs: jobs,
                    jobsCount,
                    jobsRecruted
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    },
    findOne: async function (req, res) {
        
        const id = req.userId;
        const candidatesCount = await CandidateModel.count({ where: { id_candidate: id } , distinct: true, col: 'id_job' });
        const jobsRecrutedCount = await RecruitmentModel.count({ where: { id_candidate: id } });
        await JobModel.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 4,
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                    candidatesCount,
                    jobsRecrutedCount
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    },
    adm: async function (req, res) {
        const jobsCount = await JobModel.count();
        const usersCount = await UserModel.count();
        const candidatesCount = await UserModel.count({ where: { account_type: "candidate" } });
        await JobModel.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 4,
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                    jobsCount,
                    usersCount,
                    candidatesCount
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    },
}