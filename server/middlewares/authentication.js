let jwt = require('jsonwebtoken');

//Middleware para verificar que el token sea correcto
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

//Middleware para verificar que el usuario logueado sea un admin
let verificarAdmin = (req, res, next) => {
    let usuario = req.usuario;

    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            error: {
                ok: false,
                message: "No esta autorizado para realizar esta accion"
            }
        });
    }
    //En este caso es igual por lo que la peticion puede pasar
    next();
}

module.exports = {
    verificarToken,
    verificarAdmin
}