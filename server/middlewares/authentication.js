let jwt = require('jsonwebtoken');
//Verificar token

let verificarToken = (req, res, next) => {

    let token = req.get('authorization');

    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if(error){
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'token invalido'
                }
            });
        }
        //Si todo va bien permite pasar a la peticion
        req.usuario = decoded.usuario;
        next();

    });

};

module.exports = {
    verificarToken
}