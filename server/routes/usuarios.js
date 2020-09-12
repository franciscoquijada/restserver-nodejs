const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const {verificarToken, verificarAdmin } = require('../middlewares/authentication');

//Peticiones get
app.get('/usuarios', verificarToken, (req, res) => {

    //Obtengo desde los parametros el desde
    let desde = req.query.desde || 0;
    desde = Number(desde);
    //Obtengo desde los parametros el limite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email img role estado')
    .skip(desde)
    .limit(limite)
    .exec((error, usuarios) =>{
        if(error){
            return res.status(400).json({
                status: false,
                error
            });
        }
        //Para devolver cantidad de registros
        Usuario.count({}, (error, cantidadRegistros) => {
            res.json({
                status: true,
                usuarios,
                cantidad_registros : cantidadRegistros
            });
        });
    });
});

//Mostrar un usuario por id
app.get('/usuario/:id', verificarToken, (req, res) => {
    let idUsuario = req.params.id;
    Usuario.findById(idUsuario, (error, usuarioBd) => {
        //Si se produce error
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        if(!usuarioBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id de usuario no existe"
                }
            });
        }
        //En caso correcto
        res.json({
            status: true,
            usuario: usuarioBd
        });
    });
});

//Peticiones post
app.post('/usuarios', [verificarToken, verificarAdmin], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
        estado: body.estado,
    });
    //Guardo usuario en la base de datos
    usuario.save((error, usuarioBd) => {
        if(error){
            return res.status(400).json({
                status: false,
                error
            });
        }

        return res.json({
            status: true,
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
                status: false,
                error
            });
        }

        res.json({
            status: true,
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
                status: false,
                error
            });
        }
        //Si el usuario recibido es nulo
        if(!UsuarioBorrado)
            res.status(400).json({
                status: false,
                error: 'Usuario no existe'
            });
        //Si se pudo borrar el usuario correctamente
        res.json({
            status: true,
            mensaje: "El usuario con id: " + id + " fue eliminada correctamente.",
            usuario: UsuarioBorrado,
        });
    });

    //res.json('Delete de usuarios');
});

//Buscar usuarios por palabras
app.get('/usuarios/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let RegExpresion = new RegExp(termino, 'i');
    Usuario.find({ nombre: RegExpresion, estado: true })
    .exec((error, usuarioBd) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        res.json({
            status: true,
            usuario: usuarioBd
        });
    });
});

module.exports = app;

