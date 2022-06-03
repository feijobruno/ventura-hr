const express = require("express");
var router = express.Router();

const yup = require('yup');
const { Op } = require("sequelize");

const { validateToken } = require('../middlewares/auth');

const JobSkill = require('../models/JobCandidate');

router.get("/job_skill/:id/:page", validateToken, async (req, res) => {
    const { id } = req.params;
    const { page = 1 } = req.params;
    const limit = 7;
    var lastPage = 1;

    const countJobSkill = await JobSkill.count();
    if (countJobSkill === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum critério encontrado!"
        });
    } else {
        lastPage = Math.ceil(countJobSkill / limit);
    }

    await JobSkill.findAll({
        attributes: ['id', 'id_job', 'skill', 'description', 'profile', 'weight'],
        where: { id_job: id },
        order: [['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    })
        .then((jobSkill) => {
            return res.json({
                erro: false,
                jobSkill,
                countJobSkill,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma critério encontrada!"
            });
        });
});

// router.get("/job_skill/:id", validateToken, async (req, res) => {
//     const { id } = req.params;

//     //await JobSkill.findByPk(id)
//     await JobSkill.findAll({ where: { id_job: id } })
//         .then((jobSkill) => {
//             return res.json({
//                 erro: false,
//                 jobSkill: jobSkill
//             });
//         }).catch(() => {
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Nenhum usuário encontrado!"
//             });
//         });
// });

router.post("/job_skill", validateToken, async (req, res) => {
    var dados = req.body;

    // const schema = yup.object().shape({
    //     skill: yup.string("Erro: Necessário preencher o campo critério!")
    //         .required("Erro: Necessário preencher o campo data critério!"),
    //     // description: yup.string("Erro: Necessário preencher o campo descrição!")
    //     //     .required("Erro: Necessário preencher o campo descrição!"),
    //     // title: yup.string("Erro: Necessário preencher o campo cargo!")
    //     //     .required("Erro: Necessário preencher o campo cargo!")
    // });

    // try {
    //     await schema.validate(dados);
    // } catch (err) {
    //     return res.status(400).json({
    //         erro: true,
    //         mensagem: err.errors
    //     });
    // }

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


    await JobSkill.create(dados)
    // console.log(dados)
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
});

// router.put("/user", validateToken, async (req, res) => {
//     const { id } = req.body;

//     const schema = yup.object().shape({
//         /*password: yup.string("Erro: Necessário preencher o campo senha!")
//             .required("Erro: Necessário preencher o campo senha!")
//             .min(6, "Erro: A senha deve ter no mínimo 6 caracteres!"),*/
//         email: yup.string("Erro: Necessário preencher o campo e-mail!")
//             .email("Erro: Necessário preencher o campo e-mail!")
//             .required("Erro: Necessário preencher o campo e-mail!"),
//         name: yup.string("Erro: Necessário preencher o campo nome!")
//             .required("Erro: Necessário preencher o campo nome!")
//     });

//     try {
//         await schema.validate(req.body);
//     } catch (err) {
//         return res.status(400).json({
//             erro: true,
//             mensagem: err.errors
//         });
//     }

//     const user = await User.findOne({
//         where: {
//             email: req.body.email,
//             id: {
//                 [Op.ne]: id
//             }
//         }
//     });

//     if (user) {
//         return res.status(400).json({
//             erro: true,
//             mensagem: "Erro: Este e-mail já está cadastrado!"
//         });
//     }

//     await User.update(req.body, { where: { id } })
//         .then(() => {
//             return res.json({
//                 erro: false,
//                 mensagem: "Usuário editado com sucesso!"
//             });

//         }).catch(() => {
//             return res.status(400).json({
//                 erro: true,
//                 mensagem: "Erro: Usuário não editado com sucesso!"
//             });
//         });
// });


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