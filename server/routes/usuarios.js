const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

//Peticiones get
app.get('/usuarios', function(req, res) {
    res.json('Get de usuarios');
});

//Peticiones post
app.post('/usuarios', function(req, res) {
    
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

app.put('/usuarios/:id', function(req, res) {
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
app.delete('/usuarios', function(req, res){
    res.json('Delete de usuarios');
});

module.exports = app;

