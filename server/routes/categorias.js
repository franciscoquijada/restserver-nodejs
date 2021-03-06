const express = require('express');

let {verificarToken, verificarAdmin} = require('../middlewares/authentication');

let Categoria = require('../models/categoria');

let app = express();

//Mostrar todas las categorias
app.get('/categoria', verificarToken, (req, res) => {
    //Obtengo desde los parametros el desde
    let desde = req.query.desde || 0;
    desde = Number(desde);
    //Obtengo desde los parametros el limite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({}, 'descripcion')
    //Para ordernar por un campo en especifico
    .sort('descripcion')
    //Para que devuelva los campos del usuario en la respuesta y no solo el id
    .populate('usuario', 'nombre email role')
    .skip(desde)
    .limit(limite)
    .exec((error, categorias) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Para devolver cantidad de registros
        Categoria.count({}, (error, cantidadRegistros) => {
            res.json({
                status: true,
                categorias,
                cantidad_registros : cantidadRegistros
            });
        });
    });
});

//Mostrar una categoria por id
app.get('/categoria/:id', verificarToken, (req, res) => {
    let idCategoria = req.params.id;
    Categoria.findById(idCategoria, (error, categoria) => {
        //Si se produce error
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        if(!categoria){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id no existe"
                }
            });
        }
        //En caso correcto
        res.json({
            status: true,
            categoria
        });
    });
});

//Agregar una nueva categoria
app.post('/categoria', [verificarToken, verificarAdmin], (req, res) => {
    //Obtengo los parametros enviados por post
    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        disponible: body.disponible,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((error, categoriaBd) => {
        //En caso de error
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Si no pudo crear la categoria
        if(!categoriaBd){
            return res.status(400).json({
                status: false,
                error
            });
        }
        //En caso correcto
        res.json({
            status: true,
            categoria: categoriaBd
        });
    });

});

//Editar una categoria
app.put('/categoria/:id', [verificarToken, verificarAdmin], (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let descripcionCategoria = {
        descripcion: body.descripcion
    };
    Categoria.findByIdAndUpdate(id, descripcionCategoria, {new: true, runValidators: true}, (error, categoriaBd) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Si no existe la categoria
        if(!categoriaBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id no existe"
                }
            });
        }
        res.json({
            status: true,
            categoria: categoriaBd
        });
    });
});

//Eliminar una categoria
app.delete('/categoria/:id', [verificarToken, verificarAdmin], (req, res) => {
    //Obtengo el id
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (error, categoriaBd) => {
        if(error){
            return res.status(400).json({
                status: false,
                error
            });
        }

        //Si no existe la categoria
        if(!categoriaBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id no existe"
                }
            });
        }

        res.json({
            status: true,
            mensaje: "La categoria " + id + " fue borrada correctamente",
            categoria: categoriaBd
        });
    });
});

//Buscar categorias por palabras
app.get('/categorias/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let RegExpresion = new RegExp(termino, 'i');
    Categoria.find({ descripcion: RegExpresion, disponible: true })
    .populate('usuario', 'nombre email role')
    .exec((error, categoriaBd) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        res.json({
            status: true,
            categoria: categoriaBd
        });
    });
});

module.exports = app;
