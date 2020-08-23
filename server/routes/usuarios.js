const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const {verificarToken, verificarAdmin } = require('../middlewares/authentication');

//Peticiones get
app.get('/usuarios', verificarToken, (req, res) => {

    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    });*/

    //Obtengo desde los parametros el desde
    let desde = req.query.desde || 0;
    desde = Number(desde);
    //Obtengo desde los parametros el limite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email img role estado google')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err: error
            });
        }
        //Para devolver cantidad de registros
        Usuario.count({}, (error, cantidadRegistros) => {
            res.json({
                ok: true,
                usuarios,
                cantidad_registros : cantidadRegistros
            });
        });
    });
    //res.json('Get de usuarios');
});

//Peticiones post
app.post('/usuarios', /*[verificarToken, verificarAdmin],*/ function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        estado: body.estado,
        google: body.google,
    });
    //Guardo usuario en la base de datos
    usuario.save((error, usuarioBd) => {
        if(error){
            return res.status(400).json({
                ok: false,
                err: error
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioBd
        });
    });

    //res.json('Post de usuarios ');
});

app.put('/usuario/:id', [verificarToken, verificarAdmin], function(req, res) {
    let id = req.params.id;
    //let body = req.body;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (error, usuarioBd) => {

        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBd
        });
    });
});



//Peticiones delete
app.delete('/usuario/:id', [verificarToken, verificarAdmin], function(req, res){
    let id = req.params.id;

    let estadoCambiado = {
        estado: false,
    };

    Usuario.findByIdAndUpdate(id, estadoCambiado, {new: true}, (error, UsuarioBorrado) => {
        //Verifico error
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }
        //Si el usuario recibido es nulo
        if(!UsuarioBorrado)
            res.status(400).json({
                ok: false,
                error: 'Usuario no existe'
            });
        //Si se pudo borrar el usuario correctamente
        res.json({
            ok: true,
            usuario: UsuarioBorrado
        });
    });

    //res.json('Delete de usuarios');
});

module.exports = app;

