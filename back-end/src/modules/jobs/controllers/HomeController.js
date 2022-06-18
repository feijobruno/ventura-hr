const JobModel = require('../models/JobModel');

module.exports = {
    findAll: async function (req, res) {
        await JobModel.findAll({
            order: [["id", "DESC"]],
            limit: 9,
        })
            .then((jobs) => {
                return res.json({
                    erro: false,
                    jobs,
                });
            })
            .catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Nenhuma vaga encontrada!",
                });
            });
    }
}