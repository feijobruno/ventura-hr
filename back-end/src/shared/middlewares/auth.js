const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports = {
    isAuthenticated: async function (req, res, next) {
        //return res.json({messagem: "Validar token"});
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        };

        const [bearer, token] = authHeader.split(' ');
    
        if (!token) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        };
    
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
            req.userId = decoded.id;
            req.account_type = decoded.account_type;
            req.owner_id = decoded.owner_id;
    
            return next();
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página!"
            });
        }
    }
};