const express = require("express");
var router = express.Router();

const yup = require('yup');
const { Op } = require("sequelize");

const { validateToken } = require('../middlewares/auth');

const Job = require('../models/Job');

router.get("/jobs/:page", validateToken, async (req, res) => {
    const { page = 1 } = req.params;
    const limit = 7;
    var lastPage = 1;

    const countJob = await Job.count();
    if (countJob === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhuma vaga encontrada!"
        });
    } else {
        lastPage = Math.ceil(countJob / limit);
    }

    await Job.findAll({
        attributes: ['id', 'title', 'description', 'company', 'city', 'uf','hiring_type','hiring_period','status','deadline'],
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
});

router.get("/job/:id", validateToken, async (req, res) => {
    const { id } = req.params;

    //await User.findAll({ where: { id: id } })
    await Job.findByPk(id)
        .then((job) => {
            return res.json({
                erro: false,
                job: job
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.get("/jobs-latest/", validateToken, async (req, res) => {
    await Job.findAll({ limit: 4 })
        .then((jobs) => {
            return res.json({
                erro: false,
                jobs: jobs
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum usuário encontrado!"
            });
        });
});

router.post("/job", validateToken, async (req, res) => {
    var dados = req.body;

    const schema = yup.object().shape({
        deadline: yup.string("Erro: Necessário preencher o campo data limite!")
            .required("Erro: Necessário preencher o campo data limite!"),
        description: yup.string("Erro: Necessário preencher o campo descrição!")
            .required("Erro: Necessário preencher o campo descrição!"),
        title: yup.string("Erro: Necessário preencher o campo cargo!")
            .required("Erro: Necessário preencher o campo cargo!")
    });

    try {
        await schema.validate(dados);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    // const job = await Job.findOne({
    //     where: {
    //         title: req.body.title
    //     }
    // });

    // if (job) {
    //     return res.status(400).json({
    //         erro: true,
    //         mensagem: "Erro: Este cargo já está cadastrado!"
    //     });
    // }


   await Job.create(dados)
        .then((job) => {
            return res.json({
                erro: false,
                mensagem: "Vaga cadastrada com sucesso!",
                id_job: job.id
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Vaga não cadastrada com sucesso!"
            });
        });
});

router.put("/job", validateToken, async (req, res) => {
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

    // const job = await Job.findOne({
    //     where: {
    //         email: req.body.email,
    //         id: {
    //             [Op.ne]: id
    //         }
    //     }
    // });

    // if (job) {
    //     return res.status(400).json({
    //         erro: true,
    //         mensagem: "Erro: Este e-mail já está cadastrado!"
    //     });
    // }

    await Job.update(req.body, { where: { id } })
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
});


// router.delete("/job/:id", validateToken, async (req, res) => {
//     const { id } = req.params;

//     await Job.destroy({ where: { id } })
//         .then(() => {
//             return res.json({
//                 erro: false,
//                 mensagem: "Usuário apagado com sucesso!"
//             });
//         }).catch(() => {
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Usuário não apagado com sucesso!"
//             });
//         });
// });

module.exports = router;