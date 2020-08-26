const express = require("express");

let {verificarAdmin, verificarToken} = require('../middlewares/authentication');

let Categoria = require('../models/categoria');

let Usuario = require('../models/usuario');

let Producto = require('../models/producto');

//Mostrar todas los productos
app.get('/producto', verificarToken, (req, res) => {

});

//Mostrar todos los productos por id
app.get('/producto/:id', verificarToken, (req, res) =>{

});

//Crear producto
app.post('/producto', [verificarToken, verificarAdmin], (req, res) => {

});

//Editar producto
app.put('/producto/:id', [verificarAdmin, verificarToken], (req, res) =>{

});

//Eliminar Producto
app.delete('/producto/:id', [verificarAdmin, verificarToken], (req, res) => {

});

const app = express();

module.exports = app;
