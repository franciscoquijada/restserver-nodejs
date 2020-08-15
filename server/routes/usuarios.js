const express = require('express');
const app = express();
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
        password: body.password,
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

//Peticiones put
app.put('/usuarios', function(req, res){
    res.json('Put de usuarios')
});

//Peticiones delete
app.delete('/usuarios', function(req, res){
    res.json('Delete de usuarios');
});

module.exports = app;

