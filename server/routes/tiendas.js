const express = require('express');

let {verificarToken, verificarAdmin} = require('../middlewares/authentication');

let Tienda = require('../models/tienda');

let app = express();

//Mostrar todas las tiendas
app.get('/tiendas', verificarToken, (req, res) => {
    //Obtengo desde los parametros el desde
    let desde = req.query.desde || 0;
    desde = Number(desde);
    //Obtengo desde los parametros el limite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Tienda.find({}, 'nombre direccion')
    //Para ordernar por direccion
    .sort('nombre')
    .skip(desde)
    .limit(limite)
    .exec((error, tiendas) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Para devolver cantidad de registros
        Tienda.count({}, (error, cantidadRegistros) => {
            res.json({
                status: true,
                tiendas,
                cantidad_registros : cantidadRegistros
            });
        });
    });
});

//Mostrar una tienda por id
app.get('/tienda/:id', verificarToken, (req, res) => {
    let idTienda = req.params.id;
    Tienda.findById(idTienda, (error, tienda) => {
        //Si se produce error
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        if(!tienda){
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
            tienda
        });
    });
});

//Agregar una nueva tienda
app.post('/tienda', [verificarToken, verificarAdmin], (req, res) => {
    //Obtengo los parametros enviados por post
    let body = req.body;

    let tienda = new Tienda({
        nombre: body.nombre,
        direccion: body.direccion
    });

    tienda.save((error, tiendaBd) => {
        //En caso de error
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Si no pudo crear la tienda
        if(!tiendaBd){
            return res.status(400).json({
                status: false,
                error
            });
        }
        //En caso correcto
        res.json({
            status: true,
            tienda: tiendaBd
        });
    });

});

//Editar una tienda
app.put('/tienda/:id', [verificarToken, verificarAdmin], (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let dataTienda = {
        direccion: body.direccion
    };
    Tienda.findByIdAndUpdate(id, dataTienda, {new: true, runValidators: true}, (error, tiendaBd) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        //Si no existe la tienda
        if(!tiendaBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id no existe"
                }
            });
        }
        res.json({
            status: true,
            tienda: tiendaBd
        });
    });
});

//Eliminar una tienda
app.delete('/tienda/:id', [verificarToken, verificarAdmin], (req, res) => {
    //Obtengo el id
    let id = req.params.id;

    Tienda.findByIdAndDelete(id, (error, tiendaBd) => {
        if(error){
            return res.status(400).json({
                status: false,
                error
            });
        }

        //Si no existe la tienda
        if(!tiendaBd){
            return res.status(400).json({
                status: false,
                error: {
                    message: "El id no existe"
                }
            });
        }

        res.json({
            status: true,
            mensaje: "La tienda con id: " + id + " fue eliminada correctamente.",
            tienda: tiendaBd
        });
    });
});

//Buscar tiendas por palabras
app.get('/tienda/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let RegExpresion = new RegExp(termino, 'i');
    Tienda.find({ nombre: RegExpresion, disponible: true })
    .exec((error, tiendaBd) => {
        if(error){
            return res.status(500).json({
                status: false,
                error
            });
        }
        res.json({
            status: true,
            tienda: tiendaBd
        });
    });
});

module.exports = app;
