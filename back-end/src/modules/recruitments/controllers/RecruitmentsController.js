const db = require('../../../shared/database/database');
const RecruitmentModel = require('../models/RecruitmentModel');
const JobModel = require('../../jobs/models/JobModel');
const { Op, QueryTypes } = require("sequelize");

module.exports = {
    create: async function (req, res) {

        const data = req.body;
        data.owner_id = req.owner_id;

        const recruitment = await RecruitmentModel.findOne({
            where: {  id_job: data.id_job }
        }   
        );
    
        if (recruitment) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Você já selecionou um candidato para essa vaga!"
            });
        }
        
        await JobModel.update( {status: "Recrutada"}, { where: { id: req.body.id_job } })
        await RecruitmentModel.create(data)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Candidato selecionado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Candidato não selecionado com sucesso!"
            });
        });
    },
    findAll: async function (req, res) {
        const { id } = req.params;
  
        const jobScore = await db.query("SELECT * FROM `ventura-hr`.vw_job_scores WHERE ID_JOB = "+ id, { type: QueryTypes.SELECT });
        const candidateScore = await db.query("SELECT * FROM `ventura-hr`.vw_candidate_scores WHERE ID_JOB = "+ id, { type: QueryTypes.SELECT });
        return res.json({
            erro: false,
            jobScore,
            candidateScore
        });
    },
    findOne: async function (req, res) {
        const id_candidate = req.userId;
           
        await RecruitmentModel.findAll( { where: { id_candidate: id_candidate } })
        .then((jobsRecruited) => {
            return res.json({
                erro: false,
                jobsRecruited
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Candidato não possui vaga recrutada!"
            });
        });
    }
}