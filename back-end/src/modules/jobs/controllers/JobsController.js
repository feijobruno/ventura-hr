const JobModel = require('../models/JobModel');
const SkillModel = require('../../skills/models/SkillModel');
const yup = require('yup');
const { Op } = require("sequelize");

module.exports = {
    create: async function (req, res) {
        const owner_id = req.owner_id;
        const data = req.body;

        data.owner_id = owner_id;
        data.status = "Aberta";

        if (data.deadline == null ) {
            let deadline = new Date();
            deadline.setDate(date.getDate() + 30);
            data.deadline = deadline;
        }

        const schema = yup.object().shape({
            deadline: yup.string("Erro: Necessário preencher o campo data limite!")
                .required("Erro: Necessário preencher o campo data limite!"),
            description: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!"),
            title: yup.string("Erro: Necessário preencher o campo cargo!")
                .required("Erro: Necessário preencher o campo cargo!")
        });

        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: err.errors
            });
        }
        await JobModel.create(data)
            .then((job) => {
                return res.json({
                    erro: false,
                    mensagem: "Vaga cadastrada com sucesso!",
                    id_job: job.id
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Vaga não cadastrada com sucesso no back-end! owner_id = " + owner_id 
                });
            });
    },
    findAll: async function (req, res) {
        const { page = 1 } = req.params;
        const limit = 5;
        var lastPage = 1;

        const countJob = await JobModel.count();
        if (countJob === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma vaga encontrada!"
            });
        } else {
            lastPage = Math.ceil(countJob / limit);
        }

        await JobModel.findAll({
            attributes: ['id', 'title', 'description', 'company', 'city', 'uf', 'hiring_type', 'hiring_period', 'status', 'deadline'],
            order: [['id', 'DESC']],
            offset: Number((page * limit) - limit),
            limit: limit
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                    countJob,
                    lastPage
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    },
    findOne: async function (req, res) {
        const { id } = req.params;
        const job = await JobModel.findByPk(id);
        const skill = await SkillModel.findAll({
            where: { id_job: id }
        });
        return res.json({
            erro: false,
            job,
            skill
        });
    },
    update: async function (req, res) {
        const { id } = req.body;

        const schema = yup.object().shape({
            description: yup.string("Erro: Necessário preencher o campo descrição!")
                .required("Erro: Necessário preencher o campo descrição!"),
            title: yup.string("Erro: Necessário preencher o campo cargo!")
                .required("Erro: Necessário preencher o campo cargo!")
        });

        try {
            await schema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: err.errors
            });
        }

        await JobModel.update(req.body, { where: { id: id } })
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Vaga editada com sucesso!"
                });

            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Vaga não editada com sucesso!"
                });
            });
    },
    search: async function (req, res) {
        const { page = 1 } = req.params;
        var data = req.body;
        const limit = 5;
        var lastPage = 1;

        const countJob = await JobModel.count({
            where: {
                [Op.or]: [{ title: data.title }, { city: data.city }],
            }
        });
        if (countJob === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma vaga encontrada!"
            });
        } else {
            lastPage = Math.ceil(countJob / limit);
        }

        await JobModel.findAll({
            where: {
                [Op.or]: [{ title: data.title }, { city: data.city }],
            },
            attributes: ['id', 'title', 'description', 'company', 'city', 'uf', 'hiring_type', 'hiring_period', 'status', 'deadline'],
            order: [['id', 'DESC']],
            offset: Number((page * limit) - limit),
            limit: limit
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                    countJob,
                    lastPage
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!"
                });
            });
    },
    reply: async function (req, res) {
        const { page = 1 } = req.params;
        var data = req.body;
        const limit = 5;
        var lastPage = 1;

        const countJob = await JobModel.count({
            where: {
                [Op.or]: [{ id: data.id }, { title: data.title }, { city: data.city }],
            }
        });
        if (countJob === null) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma vaga encontrada!"
            });
        } else {
            lastPage = Math.ceil(countJob / limit);
        }

        await JobModel.findAll({
            where: {
                [Op.or]: [{ id: data.id }, { title: data.title }, { city: data.city }],
            },
            attributes: ['id', 'title', 'description', 'company', 'city', 'uf', 'hiring_type', 'hiring_period', 'status', 'deadline'],
            order: [['id', 'DESC']],
            offset: Number((page * limit) - limit),
            limit: limit
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                    countJob,
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