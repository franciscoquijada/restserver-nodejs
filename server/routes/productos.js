const express = require("express");

let {verificarAdmin, verificarToken} = require('../middlewares/authentication');

let Producto = require('../models/producto');

const app = express();


//Mostrar todas los productos
app.get('/producto', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 0;
    hasta = Number(hasta);

    Producto.find({disponible: true}, 'nombre precioUnitario descripcion disponible categoria usuario')
    //Ordenar por nombre
    .sort('nombre')
    //Para que muestre los campos del usuario
    .populate('usuario', 'nombre email role')
    .populate('categoria', 'descripcion')
    .skip(desde)
    .limit(hasta)
    .exec((error, productos) => {
        //Verifico error
        if(error){
            return res.status(400).json({
                ok: false,
                error
            });
        }
        Producto.count({}, (error, CantidadRegistros) => {
            res.json({
                ok: true,
                productos,
                cantidad_registros: CantidadRegistros
            });
        });
    });
});

//Mostrar todos los productos por id
app.get('/producto/:id', verificarToken, (req, res) =>{
    let idProducto = req.params.id;
    Producto.findById(idProducto) 
        .populate('usuario', 'nombre email role')
        .populate('categoria', 'descripcion')
        .exec((error, producto) =>{
        //Verifico error
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }
        //En caso de que no encuentre el id
        if(!producto){
            return res.status(400).json({
                ok: false,
                error: 'No existe un producto con este id'
            });
        }
        res.json({
            ok: true,
            producto
        });
    });
});

//Crear producto
app.post('/producto', [verificarToken, verificarAdmin], (req, res) => {
    //Obtengo los parametro
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUnitario: body.precioUnitario,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((error, productoBd) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }
        //Si no pudo crear el producto
        if(!productoBd){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //En caso correcto
        res.status(201).json({
            ok: true,
            producto: productoBd
        });
    });
});

//Editar producto
app.put('/producto/:id', [verificarAdmin, verificarToken], (req, res) =>{
    let idProducto = req.params.id;
    let body = req.body;
    let productoModificado = {
        nombre : body.nombre,
        precioUnitario : body.precioUnitario,
        descripcion : body.descripcion,
        disponible : body.disponible,
        categoria : body.categoria
    }
    //Realizo busqueda de producto
    Producto.findByIdAndUpdate(idProducto, productoModificado, {new: true, runValidators: true},(error, ProductoBd) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if(!ProductoBd){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El id no existe'
                }
            })
        }
        res.json({
            ok: true,
            producto: ProductoBd
        });
    });
});

//Eliminar Producto
app.delete('/producto/:id', [/*verificarAdmin,*/ verificarToken], (req, res) => {
    let idProducto = req.params.id;
    let productoEliminado = {
        disponible : false,
    }
    Producto.findByIdAndUpdate(idProducto, productoEliminado, {new: true, runValidators: true},(error, ProductoBd) => {
        if(error){
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if(!ProductoBd){
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El id no existe'
                }
            })
        }
        res.json({
            ok: true,
            producto: ProductoBd,
            mensaje: 'Producto borrado correctamente'
        });
    });
});

module.exports = app;
