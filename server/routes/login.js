const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const {verificarToken} = require('../middlewares/authentication');


const app = express();

app.post('/login', (req, res) => {

    //Obtengo el email y password enviado a la peticion
    let body = req.body;

    Usuario.findOne({ email: body.email }, (error, usuarioBd) => {
        //Si existe error de servidor
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Si no existe el usuario
        if(!usuarioBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: 'El usuario no existe'
                }
            });
        }
        //Verifico que la contraseña sea correcta comparando la contraseña recibida
        //con la guardada en la bd asociada a este usuario
        if(!bcrypt.compareSync(body.password, usuarioBd.password)){
            return res.status(400).json({
                status: false,
                error: {
                    mensaje: 'Email o contraseña incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioBd },
            process.env.SEED,
            { expiresIn: process.env.FECHA_VENCIMIENTO_TOKEN }
        );

        res.cookie("t", token, { expire: new Date() + 9999 });

        //Si todo va bien
        res.json({
            status: true,
            usuario: usuarioBd,
            token
        });
    });
});

app.post('/logout', (req, res) => {
    req.session = null
    res.clearCookie("t");
    res.json({ message: "Sesion Cerrada" });
});

app.post('/register', (req, res) => {

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
});



module.exports = app;